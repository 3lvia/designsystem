const sassPaths = ['./node_modules'];
const Fiber = require('fibers');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssvariables = require('postcss-css-variables');


// Delete old css
function clean() {
  let filesToDelete = ['css/'];
  return del(filesToDelete);
}


// Generate elvis.css from scss files
function generateElvisStyle() {
  return gulp
    .src('./src/main.scss')
    .pipe(postcss([cssvariables()]))
    .pipe(sass({ includePaths: sassPaths }))
    .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
    .pipe(rename('elvis.css'))
    .pipe(gulp.dest('./css/'));
}


// Create minified version of elvis.css
function minifyElvisStyle() {
  return gulp
    .src('./css/*.css')
    .pipe(
      cleanCSS({ debug: true }, (details) => {
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


const generateCSS = gulp.series(clean, generateElvisStyle, minifyElvisStyle);
exports.generateCSS = generateCSS;