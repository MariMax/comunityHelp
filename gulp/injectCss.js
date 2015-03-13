'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('injectCss',['compileCss'], function() {
    return gulp.src('assets/src/index.html')
        .pipe($.inject(gulp.src('assets/src/{css,assets}/**/*.css'), {
            read: false,
            starttag: '<!-- inject:userCss -->',
            addRootSlash: false,
            relative:true
            
        }))
        .pipe(gulp.dest('assets/src'))
        .pipe($.size());
});