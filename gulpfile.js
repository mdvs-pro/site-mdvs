var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger');


var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var folders = {
	src: {
		root: './dev/',
		partials: './dev/html/**/*.html',
		html: './dev/html/*.html',
		js: './dev/assets/js/*.js',
		css: './dev/assets/css/*.css',
		style: './dev/assets/scss/*.scss',
		scss: './dev/assets/scss/**/*',
		img: './dev/assets/img/**/*',
		fonts: './dev/assets/fonts/**/*.*'
	},
	dev: {
		root: './dev/',
		js: './dev/assets/js/',
		css: './dev/assets/css/',
		scss: './dev/assets/scss/',
		img: './dev/assets/img/',
		fonts: './dev/assets/fonts/'
	},
	release: {
		root: './docs/',
		js: './docs/assets/js/',
		scss: './docs/assets/css/',
		css: './docs/assets/css/',
		img: './docs/assets/img/',
		fonts: './docs/assets/fonts/'
	}
};

gulp.task('img:release', function(){
	return gulp.src(folders.src.img)
		.pipe(gulp.dest(folders.release.img))
		// todo: add compress
		.on('error', function (error) {
			console.error('' + error);
		});
});

gulp.task('html:dev', function () {
	return gulp.src(folders.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(folders.dev.root))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('css:dev', function() {
	return gulp.src(folders.src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest(folders.dev.root))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(folders.dev.root))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('html:release', function () {
	return gulp.src(folders.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(folders.release.root))
});

gulp.task('css:release', function() {
	return gulp.src(folders.src.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest(folders.release.root))
});

gulp.task('js:release', function() {
	return gulp.src('./dev/assets/js/**/*.js')
		.pipe(gulp.dest(folders.release.js))
});

gulp.task('fonts:release', function() {
	return gulp.src(folders.src.fonts)
		.pipe(gulp.dest(folders.release.fonts))
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: {
			baseDir: folders.dev.root
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('default', ['html:dev', 'css:dev', 'browser-sync'], function () {
	gulp.watch(folders.src.html, ['bs-reload']);
	gulp.watch(folders.src.scss, ['css:dev']);
	gulp.watch(folders.src.partials, ['html:dev']);
	gulp.watch(folders.src.js, ['bs-reload']);
});

gulp.task('release', ['html:release', 'css:release', 'img:release', 'js:release', 'fonts:release']);
