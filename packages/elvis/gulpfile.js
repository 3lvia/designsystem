'use strict';

const styles = require('./tasks/styles.js');
const icons = require('./tasks/icons.js');
const classList = require('./tasks/classlist.js');
const typography = require('./tasks/typography.js');
const gulp = require('gulp');

// Run gulp tasks
gulp.task(
  'default',
  gulp.series(
    typography.createTypographyScss,
    styles.generateCSS,
    classList.createClassListOverview,
    icons.generateIcons,
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
    ],
    gulp.series('default'),
  );
});
