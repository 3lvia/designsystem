'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const del = require('del');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cssvariables = require('postcss-css-variables');
const svgo = require('gulp-svgo');
const icons = require('./src/icons/icons.config');
const svgToMiniDataURI = require('mini-svg-data-uri');
const path = require('path');
const fs = require('fs');


sass.compiler = require('node-sass');


function findUnusedIconFiles() {
  const content = fs.readdirSync('./src/icons/svg/src/');
  const remove = [];

  content.forEach(icon => {
      const filename = icon.substr(0,icon.length - 4);
      if(JSON.stringify(icons).indexOf(filename) === -1) {
          remove.push(icon);
      }
  })

  return remove;
}

function clean() {
  
  let filesToDelete = ['css/', 'src/icons/svg/dist/'];
  const unusedFiles = findUnusedIconFiles()
  .map(file => {
    return `src/icons/svg/src/${file}`;
  })

  filesToDelete = filesToDelete.concat(unusedFiles);
  return del(filesToDelete);
};

async function createEmbeddedIconsScss() {
  const iconsToInclude = icons.map(i => {
    return `src/icons/svg/dist/${i.name}.svg`
  });
  let embeddedScss = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY. 
  // ADD OR REMOVE ICONS IN icons.config.js 
  $icons : ( `;
  
  for(let i = 0; i < iconsToInclude.length; i++) {
    const fileContent = fs.readFileSync(iconsToInclude[i]).toString()
    const iconName = path.basename(iconsToInclude[i], '.svg');
    const optimizedSVGDataURI = svgToMiniDataURI(fileContent);
    embeddedScss = embeddedScss + `
      '${iconName}':  url("${optimizedSVGDataURI}")`

    if(i < iconsToInclude.length - 1){
      embeddedScss += ','
    } else {
      embeddedScss += `);`
    }
  }

  const template = fs.readFileSync('src/icons/embedded.template.scss').toString();
  const newContent = template.replace('//[[INJECT_ICONS]]', embeddedScss);
  fs.writeFileSync('src/icons/embedded.scss', newContent);

  return true;
}


function optimizeSVG() {
  const iconsToInclude = icons.map(i => {
    return `src/icons/svg/src/${i.name}.svg`
  });
  return gulp.src(iconsToInclude)
      .pipe(svgo())
      .pipe(gulp.dest('src/icons/svg/dist'));
};


function styles () {
  return gulp.src('./src/main.scss')
    .pipe(postcss([cssvariables()]))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('elvis-no-icons.css'))
    .pipe(gulp.dest('./css/'));
};

function stylesFull () {
  return gulp.src('./css/elvis-no-icons.css')
    .pipe(concat('./css/elvis-icons.css'))
    .pipe(rename('elvis-all.css'))
    .pipe(gulp.dest('./css/'));
};


function buildIcons () {
  return gulp.src('./src/icons/embedded.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('elvis-icons.css'))
    .pipe(gulp.dest('./css/'));
};

function minify() {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
}

gulp.task('default', gulp.series (clean, styles,optimizeSVG,  createEmbeddedIconsScss, buildIcons, stylesFull, minify,
    function (done) { console.log("Done!"); done(); }    
));

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.scss', './icons/svg/src/*.svg','./icons/svg/src/icons.config.js', '!./icons/embedded.scss'], gulp.series('default'));
});