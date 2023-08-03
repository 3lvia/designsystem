const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const doiuse = require('doiuse');
const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('sass');
const tap = require('gulp-tap');

// Delete old css
function clean() {
  let filesToDelete = ['css/'];
  return del(filesToDelete);
}

function lintScssTask() {
  return gulp.src('./src/**/*.scss').pipe(
    gulpStylelint({
      failAfterError: true,
      fix: false,
      reporters: [{ formatter: 'string', console: true }],
    }),
  );
}

// Generate elvis.css from scss files
function generateElvisStyle() {
  return gulp
    .src('./src/main.scss')
    .pipe(
      tap(function (file) {
        file.contents = Buffer.from(
          sass.renderSync({ file: file.path, includePaths: ['node_modules'] }).css.toString(),
        );
      }),
    )
    .pipe(autoprefixer({ cascade: false }))
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
        /* eslint-disable no-console*/
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
        /* eslint-enable */
      }),
    )
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest('./css/'));
}

const generateCSS = gulp.series(clean, lintScssTask, generateElvisStyle, minifyElvisStyle, browserSupport);
exports.generateCSS = generateCSS;
