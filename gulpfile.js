"use strict";

const config = require("config");
const gulp = require("gulp");
const log = require("fancy-log");
const vinylFtp = require("vinyl-ftp");

const gulpConfig = {
    build: {
        dest: "/",
        src: ["public/.htaccess", "public/**/*.*", "!public/data/*"],
    },
};

function deploy() {
    const ftpConnection = vinylFtp.create({
        host: config.get("ftp.host"),
        user: config.get("ftp.user"),
        password: config.get("ftp.password"),
        parallel: 5,
        log,
    });

    return gulp
        .src(gulpConfig.build.src, { base: "public", buffer: false })
        .pipe(ftpConnection.newerOrDifferentSize(gulpConfig.build.dest))
        .pipe(ftpConnection.dest(gulpConfig.build.dest));
}

exports.deploy = deploy;
