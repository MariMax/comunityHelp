'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('assets/src/index.html')
    .pipe(wiredep({
      directory: 'assets/src/bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap.js/],
    }))
    .pipe(gulp.dest('assets/src'));
});
