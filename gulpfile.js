'use strict';

const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const log = require('fancy-log');
const sass = require('gulp-sass');
const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');
const vinylFtp = require('vinyl-ftp');
const webpack = require('webpack-stream');

const config = {
    build: {
        dest: '/',
        src: [
            'public/.htaccess',
            'public/**/*.*',
            '!public/data/*',
        ],
    },
    css: {
        dest: 'static/css',
        src: [
            'node_modules/normalize.css/normalize.css',
            'src/css/app.scss',
        ],
    },
    js: {
        dest: 'static/js',
        src: {
            app: 'src/js/**/*.ts',
            test: 'tests/js/**/*.ts',
        },
    },
    webpack: require('./webpack.config'),
};

function js(watch) {
    return gulp.src(config.js.src.app)
        .pipe(webpack({ ...config.webpack, watch: true === watch }))
        .pipe(gulp.dest(config.js.dest));
}

function lint() {
    return gulp.src(Object.values(config.js.src))
        .pipe(tslint({ formatter: 'verbose' }))
        .pipe(tslint.report())
        .pipe(typescript.createProject('tsconfig.json')());
}

function css() {
    return gulp.src(config.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(cleanCss({ specialComments: 0 }))
        .pipe(gulp.dest(config.css.dest));
}

function deploy() {
    const ftpConfig = require('./ftpconfig');
    const ftpConnection = vinylFtp.create({
        host: ftpConfig.host,
        user: ftpConfig.user,
        password: ftpConfig.password,
        parallel: 10,
        log,
    });

    return gulp.src(config.build.src, { base: 'public', buffer: false })
        .pipe(ftpConnection.newerOrDifferentSize(config.build.dest))
        .pipe(ftpConnection.dest(config.build.dest));
}

function watch() {
    gulp.watch(Object.values(config.js.src), lint);
    gulp.watch('src/css/**/*.scss', css);

    return js(true); // use webpack watch
}

exports.all = gulp.parallel(js, css);
exports.css = css;
exports.default = gulp.parallel(css, watch);
exports.deploy = deploy;
exports.js = js;
exports.lint = lint;
exports.watch = watch;
