const del = require('del');
const gulp = require('gulp');
const tap = require('gulp-tap');
const sass = require('sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssvariables = require('postcss-css-variables');
const doiuse = require('doiuse');

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
    .pipe(
      tap(function (file) {
        file.contents = Buffer.from(
          sass.renderSync({ file: file.path, includePaths: ['node_modules'] }).css.toString(),
        );
      }),
    )

    .pipe(rename('elvis.css'))
    .pipe(gulp.dest('./css/'));
}

// Check for browsersupport
function browserSupport() {
  return gulp.src('./css/elvis.css').pipe(
    postcss([
      doiuse({
        browsers: [
          '>1%, last 2 versions, Firefox ESR, not dead, not IE 11, not IE 10, not op_mini all, not op_mob > 0',
        ],
        ignore: [
          'css-unset-value',
          'calc',
          'flexbox',
          'outline',
          'viewport-units',
          'pointer-events',
          'user-select-none',
          'css3-cursors',
          'css-appearance',
          'css-resize',
          'intrinsic-width',
          'css-sticky',
          'css-masks',
          'css-clip-path',
        ], // Optional things to ignore
        ignoreFiles: [],
      }),
    ]),
  );
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

const generateCSS = gulp.series(clean, generateElvisStyle, minifyElvisStyle, browserSupport);
exports.generateCSS = generateCSS;
