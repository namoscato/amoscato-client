const path = require("path");

module.exports = {
    mode: "production",
    context: path.resolve(__dirname),
    entry: {
        app: path.resolve(__dirname, "./src/js/app.ts"),
    },
    output: {
        path: path.resolve(__dirname, "./static/js"),
        filename: "[name].min.js",
    },
    module: {
        rules: [
            {
                test: [/\.ts$/],
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts"],
        modules: [
            path.resolve(__dirname, "./src"),
            path.resolve(__dirname, "./node_modules"),
        ],
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    externals: {
        jquery: "jQuery",
        moment: "moment",
    },
};
