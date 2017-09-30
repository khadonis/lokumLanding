var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	projectError = require('gulp-util'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	spritesmith = require('gulp.spritesmith'),
	browserSync = require('browser-sync').create();

gulp.task('sass', function () {
	gulp.src('App/sass/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(cleanCSS())
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('Assets/css/'))
		.pipe(browserSync.stream());
});

gulp.task('manage', function () {
	return gulp.src(['App/js/*.js'])
		.pipe(cache(uglify({ output: { comments: /^!/ } })))
		//.pipe(rename('app.min.js'))
		.pipe(gulp.dest('Assets/js'))
		.on('error', projectError.log)
});

gulp.task('fonts', function () {
	gulp.src('App/fonts/*.*')
		.pipe(gulp.dest('Assets/fonts'))
});

gulp.task('images', function () {
	return gulp.src(['App/images/**/*.+(png|jpg|gif|svg)', '!App/images/sprites/**/*'])
		.pipe(cache(gulp.dest('Assets/images')))
		.pipe(browserSync.stream());
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('App/images/sprites/*.png').pipe(spritesmith({
		imgName: '../images/sprite.png',
		cssName: '_sprite.scss'
	}));
	spriteData.img.pipe(gulp.dest('Assets/images'));
	spriteData.css.pipe(gulp.dest('App/sass/modules/'))
	.pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
	browserSync.init(["Assets/css/*.css", "Assets/js/*.js"], {
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('watch', function () {
	gulp.watch(['App/sass/**/*.scss', 'App/css/*.css'], ['sass']);
	gulp.watch('App/js/*js', ['manage']);
	gulp.watch('App/fonts/*', ['fonts']);
	gulp.watch('App/images/**/*.*', ['images', 'sprite']);
	gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'manage', 'fonts', 'images', 'browser-sync', 'sprite', 'watch']);
