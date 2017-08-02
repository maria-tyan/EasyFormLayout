var gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'), 
	autoprefixer = require('gulp-autoprefixer'),
	prettify = require('gulp-jsbeautifier'), 
	sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'), 
    browserify = require('browserify'), 
    browserifyshim = require('browserify-shim'), 
    source = require('vinyl-source-stream'),
    jslint = require('gulp-jslint');

gulp.task('css', function () {
  return gulp.src('dev/stylesheets/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
    	'include css': true,
    	outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({browsers: ['last 5 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
   
});

gulp.task('pug', function() {
   return gulp.src('dev/pug/pages/*.pug').pipe(plumber({
        	errorHandler: function (error, file) {
        	    console.log(error.message);
        	    return this.emit('end');
        	}
    	}))
        .pipe(pug({pretty: true}))
        .pipe(prettify({
        	config: './dev/json/config-pug.json'
        	}))
        .pipe(prettify.reporter()) 
        .pipe(gulp.dest('assets'));
});

gulp.task('images', function () {
    return gulp.src('dev/images/**/*.*')
        .pipe(gulp.dest('assets/images'));

});

gulp.task('media', function () {
    return gulp.src('dev/media/**/*.*')
        .pipe(gulp.dest('assets/media'));

});

gulp.task('favicon', function () {
    return gulp.src('favicon.*')
        .pipe(gulp.dest('assets/'));

});

gulp.task('fonts', function () {
    return gulp.src('dev/fonts/**/*.*')
        .pipe(gulp.dest('assets/fonts'));
});

gulp.task('jslint', function () {
    return gulp.src(['source.js'])
            .pipe(jslint())
            .pipe(jslint.reporter('default'))
            .pipe(jslint.reporter('stylish'));
});
gulp.task('browserify', function () {
    return browserify('./dev/js/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('jsLib', function () {
    return gulp.src('./dev/js/lib/*.*')
        .pipe(gulp.dest('assets/js'));
});


gulp.task('watch', function() {
  
  gulp.watch('dev/stylesheets/**/*.scss', ['css']);
  
  gulp.watch('dev/js/**/*.js', ['browserify','jslint']);
  
  gulp.watch('dev/pug/**/*.pug',['pug']);
});
gulp.task('default', ['css', 'browserify', 'jsLib', 'jslint', 'pug', 'images', 'media', 'favicon', 'fonts', 'watch']);