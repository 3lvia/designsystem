import { generateIcons } from './tasks/icons';
import { generateIconsScss } from './tasks/iconsScss';
import * as gulp from 'gulp';

// Run gulp tasks
gulp.task(
  'default',
  gulp.series(generateIcons, generateIconsScss, function (done) {
    done();
    console.log('Elvis Icons built!');
  }),
);

// Run gulp watch
gulp.task('watch', function () {
  gulp.watch(['./icons/svg/src/*.svg', './config/**.*'], gulp.series('default'));
});
