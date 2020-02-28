'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let rename = require("gulp-rename");
let del = require('del');
 
sass.compiler = require('node-sass');

function clean() {
  return del(['dist/']);
};

function styles () {
  return gulp.src('./src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('elvis.css'))
    .pipe(gulp.dest('./dist/'));
};

function minify() {
  return gulp.src('./dist/*.css')
  .pipe(cleanCSS({debug: true}, (details) => {
    console.log(`${details.name}: ${details.stats.originalSize}`);
    console.log(`${details.name}: ${details.stats.minifiedSize}`);
  }))
  .pipe(rename('elvis.min.css'))
  .pipe(gulp.dest('./dist/min'));
}

gulp.task('default', gulp.series (clean, styles, minify,
    function (done) { console.log("Done!"); done(); }    
));

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['styles']);
});