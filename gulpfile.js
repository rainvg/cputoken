/* File: gulpfile.js */

// TODO: minify dependencies and copy them to the dist folder.

var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace');

gulp.task('default', ['lint','test', 'minify'], function()
{
});

gulp.task('lint', function()
{
  return gulp.src('./src/*.js').pipe(jshint()).pipe(jshint.reporter('jshint-stylish')).pipe(jshint.reporter('fail'));
});

gulp.task('minify', ['lint', 'test'], function()
{
  return gulp.src(['src/index.js', 'src/functions.js', 'src/cpuworker.js']).pipe(replace('functions.js', 'functions.min.js')).pipe(replace('cpuworker.js', 'cpuworker.min.js')).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('dist'));
});

gulp.task('test', ['lint'], function()
{
  return gulp.src('test/index.js', {read: false}).pipe(mocha()).once('error', function()
  {
    process.exit(1);
  });
});
