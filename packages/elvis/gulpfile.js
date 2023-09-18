'use strict';

const styles = require('./tasks/styles.js');
const icons = require('./tasks/icons.js');
const classList = require('./tasks/classlist.js');
const gulp = require('gulp');
const terser = require('gulp-terser');
const tap = require('gulp-tap');

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
    copyElvisToElvisFull,
    minifyElvisJs,
    function (done) {
      done();
      /* eslint-disable-next-line no-console*/
      console.log('Elvis - Successfully built Elvis!');
    },
  ),
);

// Run gulp watch
gulp.task('watch', function () {
  gulp.watch(
    [
      './src/**/*.scss',
      '!./src/utilities/typography.scss',
      './src/templates/**.*',
      './src/config/**.*',
      '!./src/config/icons.config.js',
    ],
    gulp.series('default'),
  );
});
