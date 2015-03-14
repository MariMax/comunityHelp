'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser, baseFile) {
  browser = browser === undefined ? 'default' : browser;
  baseFile = baseFile===undefined ? '/index.html':baseFile

  var routes = {};
  if(baseDir === 'assets/src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': './../bower_components',
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/#/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });

}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'assets/src'
  ], [
    'assets/src/assets/images/**/*',
    'assets/src/*.html',
    'assets/src/app/**/*.html',
    'assets/src/{css,styles,assets}/**/*.css'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('.tmp/public');
});