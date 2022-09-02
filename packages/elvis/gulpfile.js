'use strict';

const styles = require('./tasks/styles.js');
const icons = require('./tasks/icons.js');
const colors = require('./tasks/colors.js');
const classList = require('./tasks/classlist.js');
const gulp = require('gulp');

// Copies changelog to web dictionary
function copyChangelogs() {
  const elvisSrc = 'CHANGELOG.json';

  return gulp.src(elvisSrc).pipe(gulp.dest('../web/src/assets/changelogs/elvis'));
}

// Run gulp tasks
gulp.task(
  'default',
  gulp.series(
    styles.generateCSS,
    classList.createClassListOverview,
    icons.generateIcons,
    // colors.injectColors must be called after icons.generateIcons
    classList.injectDeprecatedElvisClasses,
    colors.injectColors,
    copyChangelogs,
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
