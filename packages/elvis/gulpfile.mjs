import gulp from 'gulp';
import tap from 'gulp-tap';
import terser from 'gulp-terser';

import { createClassListOverview, injectDeprecatedElvisClasses } from './tasks/classlist.mjs';
import { generateIcons } from './tasks/icons.mjs';
import { generateCSS } from './tasks/styles.mjs';

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
    generateCSS,
    createClassListOverview,
    generateIcons,
    injectDeprecatedElvisClasses,
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
    ['./src/**/*.scss', './src/templates/**.*', './src/config/**.*', '!./src/config/icons.config.mjs'],
    gulp.series('default'),
  );
});
