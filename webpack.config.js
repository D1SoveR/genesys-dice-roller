const { resolve } = require("path"),
      { startCase } = require("lodash"),

      Package = require("./package.json"),
      HtmlWebpackPlugin = require("html-webpack-plugin");
      HtmlSriPlugin = require("webpack-subresource-integrity");

const isProduction = process.env.NODE_ENV === "production";

/* HTML PLUGIN CONFIGURATION
 * =========================
 */

const reactScripts = isProduction ? [
    { url: "https://cdnjs.cloudflare.com/ajax/libs/react/16.12.0/umd/react.production.min.js",         sri: "sha256-Ef0vObdWpkMAnxp39TYSLVS/vVUokDE8CDFnx7tjY6U=" },
    { url: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.11.0/umd/react-dom.production.min.js", sri: "sha256-zuSDvIPhgPCvDFw3HdbA58QUOOGxPbs4llUvBOPxvjY=" }
] : [
    { url: "https://cdnjs.cloudflare.com/ajax/libs/react/16.12.0/umd/react.development.js",            sri: "sha256-Gan98ZZFd4CmBnocoDf5odEUDui0FGxQA46wd5DlAWY=" },
    { url: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.11.0/umd/react-dom.development.js",    sri: "sha256-8EzZN83hfG65fYS7enRzIYlXJm4euGjA4TXNp8qIg2U=" }
];

const htmlPlugins = [
    new HtmlWebpackPlugin({

        filename: "index.html",
        minify: isProduction,

        inject: false,
        template: resolve(__dirname, "assets/index.ejs"),
        templateParameters: (compilation, assets) => {

            const js = reactScripts;
            for (let i = 0; i < assets.js.length; i++) {
                const temp = { url: assets.js[i] };
                if (assets.jsIntegrity && assets.jsIntegrity[i]) {
                    temp.sri = assets.jsIntegrity[i];
                }
                js.push(temp);
            }

            return {
                meta: {
                    name: startCase(Package.name),
                    description: Package.description,
                    author: Package.maintainers[0].name
                },
                files: { js }
            }

        }

    }),
    new HtmlSriPlugin({ hashFuncNames: ['sha256'] })
];

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
        filename: "[name].js",
        path: resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: [resolve(__dirname), resolve(__dirname, "node_modules")]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [].concat(htmlPlugins),

    optimization: {
        providedExports: true,
        usedExports: true,
        sideEffects: true
    },

    devtool: isProduction ? false : "inline-source-map"
};
