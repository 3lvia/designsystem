'use strict';

const sassPaths = ['./node_modules'];
const Fiber = require('fibers');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const postcss = require('gulp-postcss');
const cssvariables = require('postcss-css-variables');
const svgo = require('gulp-svgo');
const icons = require('./src/icons/icons.config');
const svgToMiniDataURI = require('mini-svg-data-uri');
const path = require('path');
const fs = require('fs');

sass.compiler = require('sass');

function findUnusedIconFiles() {
  const content = fs.readdirSync('./src/icons/svg/src/');
  const remove = [];

  content.forEach((icon) => {
    const filename = icon.substr(0, icon.length - 4);
    if (JSON.stringify(icons).indexOf(filename) === -1) {
      remove.push(icon);
    }
  });

  return remove;
}

function clean() {
  let filesToDelete = ['css/', 'src/icons/svg/dist/'];
  const unusedFiles = findUnusedIconFiles().map((file) => {
    return `src/icons/svg/src/${file}`;
  });

  filesToDelete = filesToDelete.concat(unusedFiles);
  return del(filesToDelete);
}

async function createEmbeddedIconsJS() {
  const iconsToInclude = icons.map((i) => {
    return `src/icons/svg/dist/${i.name}.svg`;
  });
  let embeddedJs = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY. 
  // ADD OR REMOVE ICONS IN icons.config.js 
  let icons = {`;

  for (let i = 0; i < iconsToInclude.length; i++) {
    const fileContent = fs.readFileSync(iconsToInclude[i]).toString();
    const iconName = path.basename(iconsToInclude[i], '.svg');
    const optimizedSVGDataURI = svgToMiniDataURI(fileContent);
    embeddedJs =
      embeddedJs +
      `
     "e-icon--${iconName}":"${optimizedSVGDataURI}"`;

    if (i < iconsToInclude.length - 1) {
      embeddedJs += ',';
    } else {
      embeddedJs += `};`;
    }
  }

  const template = fs.readFileSync('./src/templates/elvis.template.js').toString();
  const newContent = template.replace('//[[INJECT_ICONS]]', embeddedJs);
  fs.writeFileSync('elvis.js', newContent);
  fs.writeFileSync('../../src/assets/js/elvis.js', newContent);

  return true;
}

async function createIconModule() {
  const iconsToInclude = icons.map((i) => {
    return {
      name: i.name,
      path: `src/icons/svg/dist/${i.name}.svg`,
    };
  });
  let jsModule = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY. 
  // ADD OR REMOVE ICONS IN icons.config.js`;
  let iconTypes = `declare type Icon = {
    getIcon: (color: string) => string
}`;
  let iconNameType = `
export declare type IconName = `;

  for (let i = 0; i < iconsToInclude.length; i++) {
    const fileContent = fs.readFileSync(iconsToInclude[i].path).toString();
    const iconName = path.basename(iconsToInclude[i].path, '.svg');
    jsModule =
      jsModule +
      `
    export const ${createCamelCase(iconsToInclude[i].name)} = {
      getIcon: function(color) {
          let icon = '${fileContent}'
          let iconName = '${iconName}'
          icon = icon.replace("<svg ", '<svg viewBox="0 0 24 24" aria-hidden="true" ');
          if(!color) {
              return icon;
          }
          if(color==='inverted') {
            if ((iconName.indexOf("-color") > -1) && !(iconName.indexOf("-color-") > -1)) {
                icon = icon.replace(/fill="#29D305"/g, "fillGreen");
            }
            // -full-color check can be removed when new icons have been added
            if((iconName.indexOf("-filled-color") > -1) || (iconName.indexOf("-full-color") > -1)){
                icon = icon.replace(/fill="#000"/g, "fillBlack'");
            }
            icon = icon.replace(/fill="#fff"/g, "fillBlack");
            icon = icon.replace(/fill="([^"]*)"/g, "fill='white'");
            icon = icon.replace(/fillBlack/g, "fill='black'");
            icon = icon.replace(/fillGreen/g, "fill='#29D305'");
            return icon;
          }
          return icon.replace(/fill="([^"]*)"/g, 'fill="' + color + '"');
      }
    }`;
    iconTypes =
      iconTypes +
      `
export declare const ${createCamelCase(iconsToInclude[i].name)}: Icon;`;
    iconNameType = iconNameType + `"${createCamelCase(iconsToInclude[i].name)}" | `;
  }
  const template = fs.readFileSync('./src/templates/icons.template.js').toString();
  const newContent = template.replace('//[[INJECT_ICONS]]', jsModule);
  fs.writeFileSync('./icons.js', newContent);
  fs.writeFileSync('./icons.d.ts', iconTypes + iconNameType.substring(0, iconNameType.length - 3) + ';');
  return true;
}

function createCamelCase(original) {
  const arr = original.split(/[_-]+/);
  let newText = '';

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      newText += arr[i];
      continue;
    }
    newText += arr[i][0].toUpperCase() + arr[i].substr(1, arr[i].length - 1);
  }
  return newText;
}

function optimizeSVG() {
  const iconsToInclude = icons.map((i) => {
    return `src/icons/svg/src/${i.name}.svg`;
  });
  return gulp.src(iconsToInclude).pipe(svgo()).pipe(gulp.dest('src/icons/svg/dist'));
}

function styles() {
  return gulp
    .src('./src/main.scss')
    .pipe(postcss([cssvariables()]))
    .pipe(sass({includePaths: sassPaths}))
    .pipe(sass({fiber: Fiber}).on('error', sass.logError))
    .pipe(rename('elvis.css'))
    .pipe(gulp.dest('./css/'));
}

function minify() {
  return gulp
    .src('./css/*.css')
    .pipe(
      cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }),
    )
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest('./css/'));
}

gulp.task(
  'default',
  gulp.series(clean, styles, optimizeSVG, createEmbeddedIconsJS, createIconModule, minify, function (done) {
    done();
    console.log('Elvis - Successfully built Elvis!');
  }),
);

gulp.task('watch', function () {
  gulp.watch(
    ['./src/**/*.scss', './src/templates/**.*', './icons/svg/src/*.svg', './icons/svg/src/icons.config.js'],
    gulp.series('default'),
  );
});
