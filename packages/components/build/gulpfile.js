const gulp = require('gulp');
const header = require('gulp-header');
const babel = require('gulp-babel');
const tap = require('gulp-tap');
const sass = require('sass');
const gulpSass = require('gulp-sass')(require('sass'));
const del = require('del');
const mergeStream = require('merge-stream');
const path = require('path');
const rename = require('gulp-rename');
const fs = require('fs');
const typescript = require('gulp-typescript');
const validate = require('./validateConfig.js');
const filter = require('gulp-filter');
let components = require('../elvia-components.config');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
  const tasks = components.map((component) => {
    return gulp
      .src(`template/elvia-component.template.ts`)
      .pipe(header(WARNING))
      .pipe(
        tap(function (file, t) {
          if (
            path.basename(file.path).indexOf('.ts') === -1 ||
            path.basename(file.path).indexOf('.d.ts') === 1
          ) {
            return;
          }

          const sassFile = `../components/${component.name}/src/react/style.scss`;
          let result = '';
          if (fs.existsSync(sassFile)) {
            result = sass.compile(sassFile).css.toString();
          }

          const lowercaseAttr = component.attributes.map((attr) => attr.name.toLowerCase());

          file.contents = Buffer.from(String(file.contents).replace(/{{INSERT_STYLE_HERE}}/, result));

          const elementStyle = component.elementStyle ? component.elementStyle : `''`;

          file.contents = Buffer.from(
            String(file.contents).replace(/{{INSERT_ELEMENTSTYLE_HERE}}/, component.style),
          );
          file.contents = Buffer.from(
            String(file.contents).replace(/\['{{INSERT_ATTRIBUTES}}'\]/, JSON.stringify(lowercaseAttr)),
          ); // Observed attributes has to be lowercase to meet spec
          file.contents = Buffer.from(
            String(file.contents).replace(/{{INSERT_COMPONENT_NAME}}/, component.elementName),
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
      .pipe(gulp.dest(`../components/${component.name}/dist/web_component/js/`));
  });
  return mergeStream(tasks);
}

// Convert Typescript and JSX/TSX to JS. Also convert scss to css.
function TSX_to_JS() {
  reloadComponentConfig();
  const tasks = components.map((component) => {
    return mergeStream(
      gulp
        .src([`../components/${component.name}/src/react/**/*.ts*`, '!../components/**/*.d.ts*'])
        .pipe(
          babel({
            presets: ['@babel/preset-typescript'],
            plugins: ['babel-plugin-styled-components', '@babel/plugin-transform-react-jsx'],
          }),
        )
        .pipe(header(WARNING))
        .pipe(
          // If an .scss file exists, change "import './style.scss'" to "import './style.css'"
          tap(function (file) {
            const sassFile = `../components/${component.name}/src/react/style.scss`;
            if (fs.existsSync(sassFile)) {
              file.contents = Buffer.from(String(file.contents).replace(/\.\/style\.scss/, './style.css'));
            }
          }),
        )
        .pipe(gulp.dest(`../components/${component.name}/dist/react/js/`)),
      gulp
        .src([`../components/${component.name}/src/react/**/*.d.ts`])
        .pipe(gulp.dest(`../components/${component.name}/dist/react/js/`)),
      gulp
        .src([`../components/${component.name}/src/react/**/*.scss`])
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest(`../components/${component.name}/dist/react/js/`)),
    );
  });
  return mergeStream(tasks);
}

function reactTypescriptDeclarations() {
  reloadComponentConfig();
  const componentsToCreateDeclarationsFor = components.filter(
    (component) => component.reactTypescriptDeclaration,
  );
  const tasks = componentsToCreateDeclarationsFor.map((component) => {
    const tsConfig = typescript.createProject('../tsconfig.json');
    return gulp
      .src(`../components/${component.name}/src/react/**/*.ts*`)
      .pipe(tsConfig())
      .pipe(filter(['*.d.ts']))
      .pipe(gulp.dest(`../components/${component.name}/dist/react/js/`));
  });

  if (tasks.length === 0) {
    return Promise.resolve(true);
  }
  return mergeStream(tasks);
}

function buildElviaComponentToJS() {
  return gulp
    .src(`../components/elvis-component-wrapper/src/*.ts`)
    .pipe(
      babel({
        presets: ['@babel/preset-typescript'],
      }),
    )
    .pipe(header(WARNING))
    .pipe(gulp.dest(`../components/elvis-component-wrapper/dist/`));
}

function buildToolboxComponentToJS() {
  const tsConfig = typescript.createProject('../tsconfig.json');
  const tsResult = gulp.src(['../components/elvis-toolbox/src/*.ts']).pipe(tsConfig());
  return mergeStream(tsResult, tsResult.js).pipe(gulp.dest('../components/elvis-toolbox/dist'));
}

async function runTests() {
  return exec('yarn run test');
}

// TODO: Find a way to do cleanup that does not trigger rebuild
function cleanup() {
  return del(['../components/**/dist/**/*'], { force: true });
}

// Copies changelogs from component dictionary to web dictionary
function copyChangelogs() {
  const componentSrc = ['../components/**/CHANGELOG.json'];

  return gulp.src(componentSrc, { base: '../components' }).pipe(gulp.dest('../../web/src/assets/changelogs'));
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
    buildToolboxComponentToJS,
    TSX_to_JS,
    copyChangelogs,
    reactTypescriptDeclarations,
    buildWebComponentsMagically,
    buildElviaComponentToJS,
    runTests,
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
    buildToolboxComponentToJS,
    TSX_to_JS,
    copyChangelogs,
    // reactTypescriptDeclarations, -- Currently disabled until we can make it take shorter time, remember to build before publish
    buildWebComponentsMagically,
    buildElviaComponentToJS,
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
      buildToolboxComponentToJS,
      TSX_to_JS,
      copyChangelogs,
      buildWebComponentsMagically,
      buildElviaComponentToJS,
      function (done) {
        done();
        console.log('Successfully built Elvia Components!');
      },
    ),
  );
});
