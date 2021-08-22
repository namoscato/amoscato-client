const webpack = { ...require("./webpack.config") };

delete webpack.entry;
delete webpack.output;

module.exports = function (config) {
    config.set({
        browsers: ["ChromeHeadless"],
        files: ["node_modules/moment/moment.js", "assets/js/**/*.spec.ts"],
        frameworks: ["jasmine", "webpack"],
        preprocessors: {
            "**/*.ts": ["webpack"],
        },
        webpack,
    });
};
