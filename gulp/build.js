'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpNgConfig = require('gulp-ng-config');


var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'gulpNgConfig']
});

gulp.task('scripts', function() {
    return gulp.src('assets/src/app/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('setConfig:dev',['removeConfig'], function(){
  gulp.src('devConfig.json')
    .pipe(gulpNgConfig('configModule'))
    .pipe(gulp.dest('assets/src/app/config'))
});

gulp.task('setConfig:dist',['removeConfig'], function(){
  gulp.src('distConfig.json')
    .pipe(gulpNgConfig('configModule'))
    .pipe(gulp.dest('assets/src/app/config'))
});

gulp.task('partials', function() {
    return gulp.src('assets/src/app/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: 'sailsApp',
            prefix: 'app/'
        }))
        .pipe(gulp.dest('.tmp/.tmp'))
        .pipe($.size());
});

gulp.task('html', ['injects', 'scripts', 'partials'], function() {
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src('assets/src/*.html')
        .pipe($.inject(gulp.src('.tmp/.tmp/**/*.js'), {
            read: false,
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            addPrefix: '../'
        }))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        }))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('.tmp/public'))
        .pipe($.size());
});

//.pipe($.cache($.imagemin({
//  optimizationLevel: 3,
//  progressive: true,
//  interlaced: true
//})))

gulp.task('images', function() {
    return gulp.src('assets/src/assets/images/**/*')
        .pipe(gulp.dest('.tmp/public/assets/images'))
        .pipe($.size());
});

gulp.task('bowerFonts', function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest('.tmp/public/fonts'))
        .pipe($.size());
});

gulp.task('fonts', function() {
  return gulp.src('assets/src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('.tmp/public/fonts'))
    .pipe($.size());
});

gulp.task('misc', function() {
    return gulp.src('assets/*.*')
        .pipe(gulp.dest('.tmp/public'))
        .pipe($.size());
});

gulp.task('clean', function(done) {
    $.del(['.tmp', 'asets/src/bower_components'], done);
});

gulp.task('removeConfig', function(done){
  $.del(['assets/src/app/config'], done);
});

gulp.task('build', ['bower'], function(done) {
    runSequence(['setConfig:dist','html', 'images', 'fonts', 'bowerFonts', 'misc'], done);
});
