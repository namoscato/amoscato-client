module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        files: [
            'static/js/all.js',
            'tests/**/*.spec.ts',
        ],
        frameworks: ['jasmine'],
        preprocessors: {
          "tests/**/*.spec.ts": ["typescript"]
        },
        typescriptPreprocessor: {
            typescript: require('typescript')
        },
    });
}
