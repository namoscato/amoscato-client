'use strict';

const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const config = require('config');
const gulp = require('gulp');
const log = require('fancy-log');
const sass = require('gulp-sass');
const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');
const vinylFtp = require('vinyl-ftp');
const webpack = require('webpack-stream');

const gulpConfig = {
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
    return gulp.src(gulpConfig.js.src.app)
        .pipe(webpack({ ...gulpConfig.webpack, watch: true === watch }))
        .pipe(gulp.dest(gulpConfig.js.dest));
}

function lint() {
    return gulp.src(Object.values(gulpConfig.js.src))
        .pipe(tslint({ formatter: 'verbose' }))
        .pipe(tslint.report())
        .pipe(typescript.createProject('tsconfig.json')());
}

function css() {
    return gulp.src(gulpConfig.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(cleanCss({ specialComments: 0 }))
        .pipe(gulp.dest(gulpConfig.css.dest));
}

function deploy() {
    const ftpConnection = vinylFtp.create({
        host: config.get('ftp.host'),
        user: config.get('ftp.user'),
        password: config.get('ftp.password'),
        parallel: 5,
        log,
    });

    return gulp.src(gulpConfig.build.src, { base: 'public', buffer: false })
        .pipe(ftpConnection.newerOrDifferentSize(gulpConfig.build.dest))
        .pipe(ftpConnection.dest(gulpConfig.build.dest));
}

function watch() {
    gulp.watch(Object.values(gulpConfig.js.src), lint);
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
