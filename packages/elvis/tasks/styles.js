const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const rename = require('gulp-rename');
const sass = require('sass');
const tap = require('gulp-tap');

// Delete old css
function clean() {
  let filesToDelete = ['css/'];
  return del(filesToDelete);
}

function lintScssTask() {
  return gulp
    .src('./src/**/*.scss')
    .pipe(
      gulpStylelint({
        failAfterError: true,
        fix: process.argv.includes('--fix'),
        reporters: [{ formatter: 'string', console: true }],
      }),
    )
    .pipe(gulp.dest('./src/'));
}

// Generate elvis.css from scss files
function generateElvisStyle() {
  return gulp
    .src('./src/main.scss')
    .pipe(
      tap(function (file) {
        file.contents = Buffer.from(sass.compile(file.path, { loadPaths: ['node_modules'] }).css.toString());
      }),
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename('elvis.css'))
    .pipe(gulp.dest('./css/'));
}

// Create minified version of elvis.css
function minifyElvisStyle() {
  return gulp
    .src('./css/*.css')
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        /* eslint-disable no-console*/
        console.log(`Original ${details.name}: ${details.stats.originalSize.toLocaleString()}B`);
        console.log(`Minified ${details.name}: ${details.stats.minifiedSize.toLocaleString()}B`);
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

const generateCSS = gulp.series(clean, lintScssTask, generateElvisStyle, minifyElvisStyle);
exports.generateCSS = generateCSS;
