'use strict';

const icons = require('./tasks/icons.js');
const gulp = require('gulp');
const prettier = require('gulp-prettier');

function validatePrettier() {
  return src('icons.*').pipe(prettier.check());
}

function formatPrettier() {
  return gulp.src('icons.*').pipe(prettier()).pipe(gulp.dest('.'));
}

// Run gulp tasks
gulp.task(
  'default',
  gulp.series(icons.generateIcons, formatPrettier, function (done) {
    done();
    console.log('Elvis Icons built!');
  }),
);

// Run gulp watch
gulp.task('watch', function () {
  gulp.watch(['./icons/svg/src/*.svg', './config/**.*'], gulp.series('default'));
});
