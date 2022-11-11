const gulp = require('gulp');
const header = require('gulp-header');
const babel = require('gulp-babel');
const tap = require('gulp-tap');
const del = require('del');
const mergeStream = require('merge-stream');
const path = require('path');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');
const validate = require('./validateConfig.js');
const filter = require('gulp-filter');
const cache = require('gulp-cached');
const sourcemaps = require('gulp-sourcemaps');
let components = require('../elvia-components.config');
const util = require('util');

const WARNING = `/* 
 * THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
 * DO NOT MAKE CHANGES TO THIS FILE DIRECTLY
 */
`;

function reloadComponentConfig() {
  delete require.cache[require.resolve('../elvia-components.config')];
  components = require('../elvia-components.config');
}

function setGetList(attributes) {
  let list = '';
  attributes.forEach((attr) => {
    const lowercase = attr.name.toLowerCase();

    list += `
        set ${attr.name}(newValue: any) {
            super.setProps({'${lowercase}': newValue});
        }
        get ${attr.name}() {
            return super.getProps()['${lowercase}'];
        }
        `;
    // At least 1 uppercase in attr.name
    if (lowercase !== attr.name) {
      list += `
            set ${lowercase}(newValue: any) {
                super.setProps({'${lowercase}': newValue});
            }
            get ${lowercase}() {
                return super.getProps()['${lowercase}'];
            }
            `;
    }
  });
  return list;
}

function buildWebComponentsMagically() {
  reloadComponentConfig();

  function createWebComponent(component, parentName) {
    const packageName = getPackageName(component);
    return gulp
      .src(`template/elvia-component.template.ts`)
      .pipe(header(WARNING))
      .pipe(
        tap(function (file) {
          if (
            path.basename(file.path).indexOf('.ts') === -1 ||
            path.basename(file.path).indexOf('.d.ts') === 1
          ) {
            return;
          }

          const lowercaseAttr = component.attributes.map((attr) => attr.name.toLowerCase());

          file.contents = Buffer.from(
            String(file.contents).replace(/\['{{INSERT_ATTRIBUTES}}'\]/, JSON.stringify(lowercaseAttr)),
          ); // Observed attributes has to be lowercase to meet spec
          file.contents = Buffer.from(
            String(file.contents).replace(/{{INSERT_COMPONENT_NAME}}/, packageName),
          );

          file.contents = Buffer.from(
            String(file.contents).replace(/{{INSERT_REACT_NAME}}/, component.reactName),
          );

          file.contents = Buffer.from(
            String(file.contents).replace(
              /\/\/{{INSERT_SETTERS_AND_GETTERS}}/,
              setGetList(component.attributes),
            ),
          );

          file.contents = Buffer.from(
            String(file.contents).replace(
              /\/\/{{INSERT_COMPONENT_DATA}}/,
              `
                    static getComponentData() {
                        return ${JSON.stringify(component)}
                    }    
                    `,
            ),
          );
        }),
      )
      .pipe(
        rename(function (filePath) {
          filePath.basename = component.elementName;
        }),
      )
      .pipe(
        babel({
          presets: ['@babel/preset-typescript'],
        }),
      )
      .pipe(gulp.dest(`../components/${parentName ? parentName : packageName}/dist/web_component/js/`));
  }

  const tasks = components.map((component) => {
    const subComponents = component.subComponents
      ? component.subComponents.map((subComponent) => createWebComponent(subComponent, packageName))
      : [];
    return mergeStream(createWebComponent(component), ...subComponents);
  });

  return mergeStream(tasks);
}

// Convert Typescript and JSX/TSX to JS. Also convert scss to css.
function TSX_to_JS() {
  reloadComponentConfig();
  const tasks = components.map((component) => {
    const packageName = getPackageName(component);
    return mergeStream(
      gulp
        .src([`../components/${packageName}/src/react/**/!(*.test).ts*`, '!../components/**/*.d.ts*'])
        .pipe(cache('TSX_to_JS'))
        .pipe(sourcemaps.init())
        .pipe(
          babel({
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: [
                    '>0.2%, last 2 versions, Firefox ESR, not dead, not IE <= 11, not op_mini all, not op_mob > 0',
                  ],
                },
              ],
              [
                'minify',
                {
                  builtIns: false,
                },
              ],
            ],
            plugins: ['babel-plugin-styled-components', '@babel/plugin-transform-react-jsx'],
          }),
        )
        .pipe(header(WARNING))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`../components/${packageName}/dist/react/js/`)),
      gulp
        .src([`../components/${packageName}/src/react/**/*.d.ts`])
        .pipe(gulp.dest(`../components/${packageName}/dist/react/js/`)),
    );
  });
  return mergeStream(tasks);
}

function reactTypescriptDeclarations() {
  reloadComponentConfig();
  const globsToCreateDeclarationsFor = components.map((component) => {
    const packageName = getPackageName(component);
    return `../components/${packageName}/src/react/**/!(*.test).ts*`;
  });
  const tsConfig = typescript.createProject('../tsconfig.json');

  return gulp
    .src(globsToCreateDeclarationsFor, { base: '..' })
    .pipe(cache('reactTypescriptDeclarations'))
    .pipe(tsConfig())
    .on('error', () => {})
    .pipe(filter(['*.d.ts']))
    .pipe(
      rename((path) => {
        const newPathDirname = path.dirname
          .replace('src/react', 'dist/react/js')
          .replace('src\\react', 'dist\\react\\js');
        path.dirname = newPathDirname;
      }),
    )
    .pipe(gulp.dest('../'));
}

const makeJSTranspileTask = (componentName) => {
  return gulp
    .src([`../components/${componentName}/src/**/*.ts*`])
    .pipe(cache(`makeJSTranspileTask${componentName}`))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [
          '@babel/preset-typescript',
          [
            '@babel/preset-env',
            {
              targets: [
                '>0.2%, last 2 versions, Firefox ESR, not dead, not IE <= 11, not op_mini all, not op_mob > 0',
              ],
            },
          ],
          [
            'minify',
            {
              builtIns: false,
            },
          ],
        ],
        plugins: ['babel-plugin-styled-components', '@babel/plugin-transform-react-jsx'],
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`../components/${componentName}/dist`));
};

const makeTypescriptDeclarationsTask = (componentName) => {
  const tsConfig = typescript.createProject('../tsconfig.json');
  return gulp
    .src([`../components/${componentName}/src/**/*.ts*`])
    .pipe(cache(`makeTypescriptDeclarationsTask${componentName}`))
    .pipe(tsConfig())
    .pipe(filter(['*.d.ts']))
    .pipe(gulp.dest(`../components/${componentName}/dist`));
};

// TODO: Use makeJSTranspileTask here
function buildElviaComponentToJS() {
  return gulp
    .src(`../components/elvis-component-wrapper/src/*.ts`)
    .pipe(cache('buildElviaComponentToJS'))
    .pipe(
      babel({
        presets: ['@babel/preset-typescript'],
      }),
    )
    .pipe(header(WARNING))
    .pipe(gulp.dest(`../components/elvis-component-wrapper/dist/`));
}

function getPackageName(component) {
  return component.elementName.replace('elvia', 'elvis');
}

function buildElviaComponentTSDeclaration() {
  return makeTypescriptDeclarationsTask('elvis-component-wrapper');
}

function buildToolboxComponentToJS() {
  return makeJSTranspileTask('elvis-toolbox');
}

function buildToolboxComponentTSDeclaration() {
  return makeTypescriptDeclarationsTask('elvis-toolbox');
}

// TODO: Find a way to do cleanup that does not trigger rebuild
function cleanup() {
  return del(['../components/**/dist/**/*'], { force: true });
}

// Copies changelogs from component dictionary to web dictionary
function copyChangelogs() {
  const componentSrc = ['../components/**/CHANGELOG.json'];

  return gulp
    .src(componentSrc, { base: '../components' })
    .pipe(cache('copyChangelogs'))
    .pipe(gulp.dest('../../web/src/assets/changelogs'));
}

gulp.task(
  'cleanup',
  gulp.series(cleanup, function (done) {
    done();
  }),
);

gulp.task(
  'default',
  gulp.series(
    validate.validateElviaComponentsConfig,
    buildElviaComponentTSDeclaration,
    buildToolboxComponentToJS,
    buildToolboxComponentTSDeclaration,
    buildElviaComponentToJS,
    TSX_to_JS,
    copyChangelogs,
    reactTypescriptDeclarations,
    buildWebComponentsMagically,
    function (done) {
      done();
      console.log('Successfully built Elvia Components!');
    },
  ),
);

gulp.task(
  'production',
  gulp.series(
    validate.validateElviaComponentsConfig,
    buildElviaComponentTSDeclaration,
    buildToolboxComponentToJS,
    buildToolboxComponentTSDeclaration,
    buildElviaComponentToJS,
    TSX_to_JS,
    copyChangelogs,
    // reactTypescriptDeclarations, -- Currently disabled until we can make it take shorter time, remember to build before publish
    buildWebComponentsMagically,
    function (done) {
      done();
      console.log('Successfully built Elvia Components!');
    },
  ),
);

gulp.task('watch', function () {
  gulp.watch(
    [
      '../components/*/src/**/*',
      '../elvia-components.config.js',
      './validateConfig.js',
      '../components/*/CHANGELOG.json',
    ],
    { ignoreInitial: false },
    gulp.series(
      validate.validateElviaComponentsConfig,
      buildElviaComponentTSDeclaration,
      buildToolboxComponentToJS,
      buildToolboxComponentTSDeclaration,
      buildElviaComponentToJS,
      TSX_to_JS,
      reactTypescriptDeclarations,
      copyChangelogs,
      buildWebComponentsMagically,
      function (done) {
        done();
        console.log('Successfully built Elvia Components!');
      },
    ),
  );
});
