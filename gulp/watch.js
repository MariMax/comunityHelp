'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', ['injects'], function() {
    gulp.watch('assets/src/{app,assets}/**/*.js', ['scripts', 'injectJS']);
    gulp.watch('assets/src/**/*.styl', function(event){
    	if (event.type === 'added'){
    		runSequence('injectCss');
    	} else {
    		runSequence('compileCss');
    	}
    });
    gulp.watch('assets/src/assets/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
