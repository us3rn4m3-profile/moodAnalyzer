'use strict';
const { src, dest, pipe, series, parallel, task, watch } = require('gulp'); // Require GULP
const sass = require('gulp-sass'); // Require Gulp-sass for sass transformation into css
const fileInclude = require('gulp-rigger'); // Require Gulp-rigger for including files into HTML files
const htmlmin = require('gulp-htmlmin'); // Require gulp-htmlmin for minify html
const rename = require('gulp-rename')

task('htmlInclude', function(done) {
  // Include
  src(['./*.html', '!src/html/_*.html']).pipe(fileInclude({prefix: '@@',
    basepath: '@file'})).pipe(dest('./')); done(); });
task('htmlMinify', function(done) {
  // Minify
  src('./*.html', '!./*.min.html').pipe(htmlmin({ collapseWhitespace: true, collapseInlineTagWhitespace: true, removeEmptyAttributes: true })).pipe(rename(function(path) {path.extname= ".min.html"})).pipe(dest('./'));
  done();});
task('htmlTransform', function (done) {
  //? Function to transform html files (include other files and minify it)
  series('htmlInclude', 'htmlMinify');
  done();
});

task('sass', function (done) {
	//? Function for translate files from sass to css
	src(['src/sass/*.sass', 'src/sass/*.scss'])
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(dest('output/css/'));
	done();
});
task('watch', function (done) {
	//! Function for watch files
	watch('./*.html', series('htmlInclude'));
	watch('src/sass/*.sass', series('sass'));
	done();
});

exports.default = series('watch'); //? Default function is 'watch'
exports.build = series(parallel('htmlInclude', 'sass'), 'htmlMinify'); //? Build skelet and translate from sass to css and minify html
