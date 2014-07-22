// Gulp
var gulp = require('gulp');

	// Plugins
	var sass = require('gulp-sass'),
	    autoprefixer = require('gulp-autoprefixer'),
	    minifycss = require('gulp-minify-css'),
	    concat = require('gulp-concat'),
	    notify = require('gulp-notify'),
	    clean = require('gulp-clean'),
	    rename = require('gulp-rename');
	    uglify = require('gulp-uglify');
    
	// Paths
	var paths = {
		scss: 'assets/sass/**/*.scss',
		scripts: 'assets/js/**/*.js',
		images: 'assets/img/*'
	};    
    
	// CSS
	gulp.task('styles', function() {
		return gulp.src(paths.scss)
			.pipe(sass({ style: 'expanded' }))
			.pipe(autoprefixer('last 1 version'))
			.pipe(minifycss())
			.pipe(gulp.dest('assets/css'))
			.pipe(notify({ message: 'Styles compiled! Righteous!' }));
	});
	
	// JS
	gulp.task('scripts', function() {
		return gulp.src('assets/js/scripts.js')
	    .pipe(uglify())
	    .pipe(rename({suffix: '.min'}))
	    .pipe(gulp.dest('assets/js'))
		.pipe(notify({ message: 'Scripts uglified!' }));
	});
	
	//Clean
	gulp.task('clean', function() {
	  return gulp.src(['assets/css'], {read: false})
	    .pipe(clean());
	});	
	
	// Default task
	gulp.task('default', ['clean'], function() {
		gulp.start('styles');
	});
	
	// Watch
	gulp.task('watch', function() {
		
		// Watch .scss files
		gulp.watch(paths.scss, ['styles']);
		
		//Watch .js files
		gulp.watch (paths.scripts, ['scripts']);
		
	});
	
	