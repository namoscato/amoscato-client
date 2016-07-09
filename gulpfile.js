'use strict';

var addStream = require('add-stream');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpJshint = require('gulp-jshint');
var gulpCleanCss = require('gulp-clean-css');
var gulpSass = require('gulp-sass');
var gulpUglify = require('gulp-uglify');

var css = {
    src: {
        app: 'src/css/app.scss',
        lib: 'node_modules/normalize.css/normalize.css'
    },
    dest: 'static/css'
};

var js = {
    src: {
        app: 'src/js/**/*.js',
        lib: 'node_modules/jquery/dist/jquery.min.js'
    },
    dest: 'static/js'
};

gulp.task('default', ['all', 'watch']);

gulp.task('all', [
    'js:app',
    'js:lint',
    'css'
]);

gulp.task('js', ['js:app', 'js:lint']);

gulp.task('js:app', function() {
    var stream = gulp.src(js.src.lib);

    stream = stream.pipe(
        addStream.obj(gulp
            .src(js.src.app)
            .pipe(gulpUglify({
                compress: false
            }))
        )
    );

    return stream
        .pipe(gulpConcat('all.js'))
        .pipe(gulp.dest(js.dest));
});

gulp.task('js:lint', function() {
    return gulp.src(js.src.app)
        .pipe(gulpJshint())
        .pipe(gulpJshint.reporter('default'));
});

gulp.task('css', function() {
    var stream = gulp.src(css.src.lib);

    stream = stream.pipe(
        addStream.obj(gulp
            .src(css.src.app)
            .pipe(gulpSass().on('error', gulpSass.logError))
        )
    );

    return stream
        .pipe(gulpConcat('all.css'))
        .pipe(gulpCleanCss())
        .pipe(gulp.dest(css.dest));
});

gulp.task('watch', function() {
    gulp.watch(
        js.src.app,
        [
            'js:app',
            'js:lint'
        ]
    );

    gulp.watch(
        js.src.lib,
        ['js:app']
    );

    gulp.watch(
        'src/css/**/*.scss',
        ['css']
    );
});
