import { rm } from 'fs/promises';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import lightningcss from 'gulp-lightningcss';
import rename from 'gulp-rename';
import tap from 'gulp-tap';
import { compile } from 'sass';

// Delete old css
async function clean() {
  return Promise.all([rm('css/elvis.css', { force: true }), rm('css/elvis.min.css', { force: true })]);
}

// Generate elvis.css from scss files
function generateElvisStyle() {
  return gulp
    .src('./src/main.scss')
    .pipe(
      tap(function (file) {
        file.contents = Buffer.from(compile(file.path, { loadPaths: ['node_modules'] }).css.toString());
      }),
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename('elvis.css'))
    .pipe(gulp.dest('./css/'));
}

// Create minified version of elvis.css
function minifyElvisStyle() {
  return gulp
    .src('./css/elvis.css')
    .pipe(
      tap((file) => {
        // eslint-disable-next-line no-console
        console.log(`Original size: ${file.contents.length.toLocaleString()}B`);
        return file;
      }),
    )
    .pipe(
      lightningcss({
        minify: true,
      }),
    )
    .pipe(
      tap((file) => {
        // eslint-disable-next-line no-console
        console.log(`Minified size: ${file.contents.length.toLocaleString()}B`);
        return file;
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
export { generateCSS };
