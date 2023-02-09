'use strict';

const styles = require('./tasks/styles.js');
const icons = require('./tasks/icons.js');
const classList = require('./tasks/classlist.js');
const gulp = require('gulp');
const minify = require('gulp-minify');

// Copies changelog to web dictionary
function copyChangelogs() {
  const elvisSrc = 'CHANGELOG.json';

  return gulp.src(elvisSrc).pipe(gulp.dest('../web/src/assets/changelogs/elvis'));
}

function minifyElvisJs() {
  return gulp
    .src('elvis.js')
    .pipe(minify({ ext: { min: '.min.js' }, noSource: true }))
    .pipe(
      gulp.dest('.', {
        overwrite: true,
      }),
    );
}

function copyElvisJsToWeb() {
  return gulp.src('elvis.js').pipe(gulp.dest('../web/src/assets/js'));
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
    minifyElvisJs,
    copyElvisJsToWeb,
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
