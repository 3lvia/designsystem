import * as gulp from 'gulp';
import * as babel from 'gulp-babel';
import * as tap from 'gulp-tap';
import * as del from 'del';
const mergeStream = require('merge-stream');
import * as path from 'path';
import * as rename from 'gulp-rename';
// Must import from src because the files don't exist in dist before this build script
import { ComponentAttribute, ComponentConfig } from '../components/elvis-toolbox/src/componentConfig.types';

let componentConfigs: ComponentConfig[] = [];

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
    return (
      gulp
        .src(`template/elvia-component.template.ts`)
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
              String(file.contents).replace(
                /\['{{INSERT_ATTRIBUTES}}'\]/,
                JSON.stringify(observedAttributes),
              ),
            ); // Observed attributes has to be lowercase to meet spec
            file.contents = Buffer.from(
              String(file.contents).replace(/{{INSERT_COMPONENT_NAME}}/, elementName),
            );

            file.contents = Buffer.from(
              String(file.contents).replace(/{{INSERT_REACT_NAME}}/, component.name),
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
            filePath.basename = 'web-component';
          }),
        )
        .pipe(
          babel({
            presets: ['@babel/preset-typescript'],
          }),
        ) // We put the output in the React folder, because Parcel will make React the default entry point
        // We therefore export the React index.js to /main/index.js, and the web component to react/index.js,
        // and simply swap places later on
        .pipe(gulp.dest(`../components/${parentName ? parentName : packageName}/dist/main/`))
    );
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

function getPackageName(component: ComponentConfig) {
  return getElementName(component).replace('elvia', 'elvis');
}
function getElementName(component: ComponentConfig) {
  return 'elvia' + component.name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// TODO: Find a way to do cleanup that does not trigger rebuild
function cleanup() {
  return del(['../components/**/dist', '!../components/**/node_modules/**/*'], {
    force: true,
  });
}

gulp.task(
  'cleanup',
  gulp.series(cleanup, (done) => {
    done();
  }),
);

gulp.task(
  'default',
  gulp.series(getComponentConfigs, buildWebComponentsMagically, function (done) {
    done();
    console.log('Successfully built React web component wrappers!');
  }),
);

gulp.task('watch', () => {
  gulp.watch(['../components/*/src/react/config.ts'], { ignoreInitial: false }, gulp.series('default'));
});
