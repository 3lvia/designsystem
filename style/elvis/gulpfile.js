'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let rename = require("gulp-rename");
let del = require('del');
let postcss = require('gulp-postcss');
let concat = require('gulp-concat');
let cssvariables = require('postcss-css-variables');
const svgo = require('gulp-svgo');
const icons = require('./src/icons/icons');

 
sass.compiler = require('node-sass');

function clean() {
  return del(['css/']);
};


// TODO IMPLEMENT
function createEmbeddedIcons() {
  // optimizeSVG();
  //percentEncodeSvg();
}
// TODO IMPLEMENT
function percentEncodeSvg() {}

function optimizeSVG() {
  const iconsToInclude = icons.map(i => {
    return 'src/icons/svg/src/' + i
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

gulp.task('default', gulp.series (clean, styles, buildIcons, optimizeSVG, stylesFull, minify,
    function (done) { console.log("Done!"); done(); }    
));

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['styles', 'buildIcons', 'stylesFull']);
});