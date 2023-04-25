'use strict';

const styles = require('./tasks/styles.js');
const icons = require('./tasks/icons.js');
const classList = require('./tasks/classlist.js');
const gulp = require('gulp');
const terser = require('gulp-terser');
const tap = require('gulp-tap');

// Copies changelog to web dictionary
function copyChangelogs() {
  const elvisSrc = 'CHANGELOG.json';

  return gulp.src(elvisSrc).pipe(gulp.dest('../web/src/assets/changelogs/elvis'));
}

function copyElvisToElvisFull() {
  const elvisSrc = 'elvis.js';
  const elvisFull = 'elvis.full.js';

  return gulp
    .src(elvisSrc)
    .pipe(
      tap((file) => {
        file.basename = elvisFull;
      }),
    )
    .pipe(gulp.dest('.'));
}

function minifyElvisJs() {
  return gulp
    .src('elvis.js')
    .pipe(terser())
    .pipe(
      gulp.dest('.', {
        overwrite: true,
      }),
    );
}

// Run gulp tasks
gulp.task(
  'default',
  gulp.series(
    styles.generateCSS,
    classList.createClassListOverview,
    icons.generateIcons,
    classList.injectDeprecatedElvisClasses,
    copyChangelogs,
    copyElvisToElvisFull,
    minifyElvisJs,
    function (done) {
      done();
      console.log('Elvis - Successfully built Elvis!');
    },
  ),
);

// Run gulp watch
gulp.task('watch', function () {
  gulp.watch(
    [
      './src/**/*.scss',
      '!./src/variables/typography.scss',
      './src/templates/**.*',
      './src/config/**.*',
      '!./src/config/icons.config.js',
      './CHANGELOG.json',
    ],
    gulp.series('default'),
  );
});
