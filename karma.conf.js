module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        files: [
            'static/js/all.js',
            'tests/**/*.spec.js',
        ],
        frameworks: ['jasmine'],
        preprocessors: {
          "tests/**/*.spec.js": ["babel"]
        },
    });
}
