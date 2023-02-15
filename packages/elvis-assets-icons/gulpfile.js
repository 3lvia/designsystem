'use strict';

const icons = require('./tasks/icons.js');
const iconThemeScss = require('./tasks/iconsScss.js');
const gulp = require('gulp');

// Run gulp tasks
gulp.task(
  'default',
  gulp.series(icons.generateIcons, iconThemeScss.generateIconsScss, function (done) {
    done();
    console.log('Elvis Icons built!');
  }),
);

// Run gulp watch
gulp.task('watch', function () {
  gulp.watch(['./icons/svg/src/*.svg', './config/**.*'], gulp.series('default'));
});
