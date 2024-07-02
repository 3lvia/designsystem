import { rm } from 'fs/promises';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
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
      cleanCSS(
        {
          debug: true,
          level: {
            2: {
              mergeAdjacentRules: true,
              mergeIntoShorthands: true,
              mergeMedia: true,
              mergeNonAdjacentRules: true,
              mergeSemantically: true,
              overrideProperties: true,
              removeEmpty: true,
              reduceNonAdjacentRules: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: true,
              restructureRules: true,
              skipProperties: [],
            },
          },
        },
        (details) => {
          /* eslint-disable no-console*/
          console.log(`Original ${details.name}: ${details.stats.originalSize.toLocaleString()}B`);
          console.log(`Minified ${details.name}: ${details.stats.minifiedSize.toLocaleString()}B`);
          /* eslint-enable */
        },
      ),
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
