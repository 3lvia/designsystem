'use strict';

const styles = require("./tasks/styles.js");
const icons = require("./tasks/icons.js");
const classList = require("./tasks/classlist.js");
const typography = require("./tasks/typography.js");
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');

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
    ['./src/**/*.scss', './src/templates/**.*', './icons/svg/src/*.svg', './icons/svg/src/icons.config.js'],
    gulp.series('default'),
  );
});


