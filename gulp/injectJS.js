'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
});


gulp.task('injectJS', function() {
    return gulp.src('assets/src/index.html')
        .pipe($.inject(gulp.src('assets/src/{app,assets}/**/*.js').pipe($.angularFilesort()), {
            read: false,
            starttag: '<!-- inject:userJS -->',
            addRootSlash: false,
            relative:true

        }))
        .pipe(gulp.dest('assets/src'))
        .pipe($.size());
});
