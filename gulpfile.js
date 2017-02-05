var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var path = require('path');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var paths = {
	'src': ['./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json']
};

// Handles starting up KeystoneJS
gulp.task('runKeystone', shell.task('node keystone.js'));

// Watches for changed files
gulp.task('watch', function() {
	gulp.watch('./public/styles/**/*.less', ['less']);
});

// Runs LESS compiling routines on stylesheets
gulp.task('less', function() {
	gulp.src([
		'./public/styles/site.less',
		'!./public/styles/bootstrap/**',
		'!./public/styles/themes/**'
	])
	.pipe(plumber())
	.pipe(less())
	.pipe(gulp.dest('./public/styles/'))
	.pipe(cssmin())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./public/styles/'));
});

// What should happen when you run `gulp` in cli
gulp.task('default', ['less', 'runKeystone', 'watch']);
