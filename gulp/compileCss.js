'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
});

gulp.task('compileCss',['styl','less'], function(done){
	done();
});

gulp.task('styl', function() {
    return gulp.src('assets/src/styles/**/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.csso())
        .pipe(gulp.dest('assets/src/css'));
});


gulp.task('less',function(){
    return gulp.src('assets/src/styles/*.less')
        .pipe($.less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.csso())
        .pipe(gulp.dest('assets/src/css'));
});
