const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const fs = require('fs/promises');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('sass');
const tap = require('gulp-tap');

// Delete old css
async function clean() {
  return fs.rm('css/', { force: true, recursive: true });
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

const generateCSS = gulp.series(clean, generateElvisStyle, minifyElvisStyle);
exports.generateCSS = generateCSS;
