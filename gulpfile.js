'use strict';

var addStream = require('add-stream');
var gulp = require('gulp');
var gulpCleanCss = require('gulp-clean-css');
var gulpConcat = require('gulp-concat');
var gulpSass = require('gulp-sass');
var gulpTslint = require('gulp-tslint');
var gulpTypescript = require('gulp-typescript');
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
        app: 'src/js/**/*.ts',
        lib: 'node_modules/jquery/dist/jquery.min.js'
    },
    dest: 'static/js'
};

var tsProject = gulpTypescript.createProject('tsconfig.json');

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
        addStream.obj(tsProject.src()
            .pipe(gulpTypescript(tsProject))
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
        .pipe(gulpTslint({
            formatter: "verbose"
        }))
        .pipe(gulpTslint.report());
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
