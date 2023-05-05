import * as gulp from 'gulp';
const header = require('gulp-header');
import * as babel from 'gulp-babel';
import * as tap from 'gulp-tap';
import * as del from 'del';
const mergeStream = require('merge-stream');
import * as path from 'path';
import * as rename from 'gulp-rename';
import * as typescript from 'gulp-typescript';
import * as filter from 'gulp-filter';
import * as cache from 'gulp-cached';
import * as sourcemaps from 'gulp-sourcemaps';
// Must import from src because the files don't exist in dist before this build script
import { ComponentAttribute, ComponentConfig } from '../components/elvis-toolbox/src/componentConfig.types';

let componentConfigs: ComponentConfig[] = [];

const WARNING = `/* 
 * THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
 * DO NOT MAKE CHANGES TO THIS FILE DIRECTLY
 */
`;

function getComponentConfigs() {
  componentConfigs = [];
  return gulp.src(['../components/*/src/react/config.ts']).pipe(
    tap(function (file) {
      const fileContent = require(file.path);
      componentConfigs.push(fileContent.config);
    }),
  );
}

function shouldIgnoreAttribute(attr: ComponentAttribute) {
  return attr.type === 'event';
}

function setGetList(attributes: ComponentAttribute[]) {
  let list = '';
  attributes.forEach((attr) => {
    if (shouldIgnoreAttribute(attr)) {
      return;
    }
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
  function createWebComponent(component: ComponentConfig, parentName?: string) {
    const packageName = getPackageName(component);
    const elementName = getElementName(component);
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

          const filteredAttributes = component.attributes.filter((attr) => !shouldIgnoreAttribute(attr));
          const observedAttributes = filteredAttributes.map((attr) => attr.name.toLowerCase());

          file.contents = Buffer.from(
            String(file.contents).replace(/\['{{INSERT_ATTRIBUTES}}'\]/, JSON.stringify(observedAttributes)),
          ); // Observed attributes has to be lowercase to meet spec
          file.contents = Buffer.from(
            String(file.contents).replace(/{{INSERT_COMPONENT_NAME}}/, elementName),
          );

          file.contents = Buffer.from(String(file.contents).replace(/{{INSERT_REACT_NAME}}/, component.name));

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
          filePath.basename = elementName;
        }),
      )
      .pipe(
        babel({
          presets: ['@babel/preset-typescript'],
        }),
      )
      .pipe(gulp.dest(`../components/${parentName ? parentName : packageName}/dist/web_component/js/`));
  }

  const tasks = componentConfigs.map((component) => {
    const subComponents = component.subComponents
      ? component.subComponents.map((subComponent) =>
          createWebComponent(subComponent, getPackageName(subComponent)),
        )
      : [];
    return mergeStream(createWebComponent(component), ...subComponents);
  });

  return mergeStream(tasks);
}

// Convert Typescript and JSX/TSX to JS. Also convert scss to css.
function TSX_to_JS() {
  const tasks = componentConfigs.map((component) => {
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
                  modules: false,
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
            ] as string[],
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
  const globsToCreateDeclarationsFor = componentConfigs.map((component) => {
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

const makeJSTranspileTask = (componentName: string) => {
  return gulp
    .src([`../components/${componentName}/src/**/!(*.test).ts*`])
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
        ] as string[],
        plugins: ['babel-plugin-styled-components', '@babel/plugin-transform-react-jsx'],
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`../components/${componentName}/dist`));
};

const makeTypescriptDeclarationsTask = (componentName: string) => {
  const tsConfig = typescript.createProject('../tsconfig.json');
  return gulp
    .src([`../components/${componentName}/src/**/!(*.test).ts*`])
    .pipe(cache(`makeTypescriptDeclarationsTask${componentName}`))
    .pipe(tsConfig())
    .pipe(filter(['*.d.ts']))
    .pipe(gulp.dest(`../components/${componentName}/dist`));
};

// TODO: Use makeJSTranspileTask here
function buildElviaComponentToJS() {
  return gulp
    .src(`../components/elvis-component-wrapper/src/!(*.test).ts*`)
    .pipe(cache('buildElviaComponentToJS'))
    .pipe(
      babel({
        presets: ['@babel/preset-typescript'],
      }),
    )
    .pipe(header(WARNING))
    .pipe(gulp.dest(`../components/elvis-component-wrapper/dist/`));
}

function getPackageName(component: ComponentConfig) {
  return getElementName(component).replace('elvia', 'elvis');
}
function getElementName(component: ComponentConfig) {
  return 'elvia' + component.name.replace(/([A-Z])/g, '-$1').toLowerCase();
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
  return del(['../components/**/dist/**/*', '!../components/**/node_modules/**/*'], { force: true });
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
    buildElviaComponentTSDeclaration,
    buildToolboxComponentToJS,
    buildToolboxComponentTSDeclaration,
    getComponentConfigs,
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
    buildElviaComponentTSDeclaration,
    buildToolboxComponentToJS,
    buildToolboxComponentTSDeclaration,
    getComponentConfigs,
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

gulp.task('watch', function () {
  gulp.watch(
    ['../components/*/src/**/*', '../components/*/src/react/config.ts', '../components/*/CHANGELOG.json'],
    { ignoreInitial: false },
    gulp.series(
      buildElviaComponentTSDeclaration,
      buildToolboxComponentToJS,
      buildToolboxComponentTSDeclaration,
      getComponentConfigs,
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
});
