const { readFileSync } = require("fs"),
      { resolve } = require("path"),
      { startCase } = require("lodash"),
      Package = require("./package.json");

const isDevServer = !!process.env.WEBPACK_DEV_SERVER,
      isProduction = !isDevServer && process.env.NODE_ENV === "production";

const configPartials = [];

/* TYPESCRIPT HANDLING
 * ===================
 * We use TypeScript for main application code, and this part of the config
 * sets up the required webpack loaders.
 */

configPartials.push({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
});

/* STYLING HANDLING
 * ================
 * This bit of configuration sets up handling of CSS and LESS within Webpack.
 * LESS is processed into CSS with less-loader, CSS is processed into JS chunks
 * with css-loader, then the magic begins.
 * When running in dev server, style-loader is used to load the styles into tags,
 * and to enable HMR for rapid styling development. Otherwise, the styles are pulled
 * into separate CSS file for quicker loading in deployment.
 */

configPartials.push(function() {

    const config = {
        module: {
            rules: [{
                test: /\.(?:le|c)ss$/,
                use: [{
                    loader: "css-loader",
                    options: { sourceMap: false }
                }]
            }, {
                test: /\.less$/,
                use: [{
                    loader: "less-loader",
                    options: {
                        sourceMap: false,
                        paths: [resolve(__dirname), resolve(__dirname, "node_modules")]
                    }
                }]
            }]
        },
        resolve: {
            extensions: [".less", ".css"]
        }
    };

    // Enable source maps for dev builds and server
    if (!isProduction) {
        config.module.rules.forEach(rule => rule.use[0].options.sourceMap = true);
    }

    if (isDevServer) {
        config.module.rules[0].use.unshift("style-loader");
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    styling: {
                        name: "styling",
                        test: /\.(?:le|c)ss$/,
                        priority: -5
                    }
                }
            }
        };
    } else {
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        config.module.rules[0].use.unshift(MiniCssExtractPlugin.loader);
        config.plugins = [new MiniCssExtractPlugin({ filename: `styles${isProduction ? "-[contenthash]" : ""}.css` })];
    }

    return config;

}());

/* HTML GENERATION CONFIG
 * ======================
 * This part of the config sets up generation of the HTML page containing
 * all the application code. Applicable both to production builds and dev server.
 */

configPartials.push(function() {

    /* React is loaded from external CDN (increasing number of domains used when
     * loading the webpage, thus allowing for faster concurrent downloads), rather than bundled.
     * For development we use unminified version with full debugging, for production we load
     * the optimised version.
     * Also SRI to make sure that those external files can't be tampered with.
     */
    const reactScripts = isProduction ? [
        { url: "https://cdnjs.cloudflare.com/ajax/libs/react/16.12.0/umd/react.production.min.js",         sri: "sha256-Ef0vObdWpkMAnxp39TYSLVS/vVUokDE8CDFnx7tjY6U=" },
        { url: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.11.0/umd/react-dom.production.min.js", sri: "sha256-zuSDvIPhgPCvDFw3HdbA58QUOOGxPbs4llUvBOPxvjY=" }
    ] : [
        { url: "https://cdnjs.cloudflare.com/ajax/libs/react/16.12.0/umd/react.development.js",            sri: "sha256-Gan98ZZFd4CmBnocoDf5odEUDui0FGxQA46wd5DlAWY=" },
        { url: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.11.0/umd/react-dom.development.js",    sri: "sha256-8EzZN83hfG65fYS7enRzIYlXJm4euGjA4TXNp8qIg2U=" }
    ];

    const config = {
        plugins: [
            new (require("html-webpack-plugin"))({

                filename: "index.html",
                minify: isProduction,

                inject: false,
                template: resolve(__dirname, "assets/index.ejs"),

                /**
                 * This generates following template parameters for use:
                 * - meta - map of all <meta> tags to create in the index file
                 * - meta.name - also used for <title>
                 * - files - all the scripts and styles to be linked from the index file
                 * - files.js - list of JavaScript files, both Webpack generated and external
                 * - files.js[].url - the address of the JS file to link
                 * - files.js[].sri? - if present, hash by which the file can be verified
                 */
                templateParameters: (compilation, assets) => {

                    const files = {};

                    // We set up arrays of all the Javascript and CSS files,
                    // optionally adding their SRI hashes to then use when generating index file
                    [
                        ["js", reactScripts],
                        ["css", []]
                    ].forEach(([key, list]) => {

                        for (let i = 0; i < assets[key].length; i++) {
                            const temp = { url: assets[key][i] };
                            // If webpack-subresource-integrity is loaded, add generated SRIs as well
                            if (assets[`${key}Integrity`] && assets[`${key}Integrity`][i]) {
                                temp.sri = assets[`${key}Integrity`][i];
                            }
                            list.push(temp);
                        }

                        files[key] = list;
                    });

                    return {
                        meta: {
                            name: startCase(Package.name),
                            description: Package.description,
                            author: Package.maintainers[0].name
                        },
                        files
                    }

                }

            })
        ],
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    };

    // Only use SRI for generated files if building for production
    if (isProduction) {
        config.plugins.push(new (require("webpack-subresource-integrity"))({ hashFuncNames: ["sha256"] }));
    }

    return config;

}());

/* MINIFICATION
 * ============
 * This configuration bit sets up both JavaScript and CSS minifiers when building for production.
 * As there's some custom setup required (for example ensuring that dice class names don't get mangled),
 * JS minifier is defined explicitly along with the CSS one, as per webpack documentation.
 * When running in development, this entire section is skipped.
 */
configPartials.push(function() {

    if (!isProduction) {
        return {};
    }

    // In couple of places, we rely on actual class names in the code;
    // ensure that those are preserved in the minification process.
    const reserved = [];

    // Following bit ensures that class names for dice classes are retained;
    // they're used in some parts of the interface code to automatically
    // apply correct styling.
    reserved.push(...readFileSync(resolve(__dirname, "src/model/dice.ts"), "utf8")
        .match(/(?<=\bexport class )[a-zA-Z]+Die\b/g));

    const TerserJSPlugin = require("terser-webpack-plugin"),
          OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

    return {
        optimization: {
            minimizer: [
                new TerserJSPlugin({
                    terserOptions: {
                        mangle: { reserved },
                        compress: { keep_classnames: true }
                    }
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorPluginOptions: {
                        preset: ["default", { discardComments: { removeAll: true } }]
                    }
                })
            ]
        }
    };

}());

/* BUNDLING CONFIGURATION
 * ======================
 * This configuration bit puts all of the vendor code (third party libraries bundled with the app)
 * into a separate file and marks it with content hash. This way, when new versions are released,
 * but the vendor code stays the same, it doesn't need to be redownloaded.
 */

configPartials.push({
    optimization: {
        splitChunks: {
            chunks: "all",
            filename: `[name]${isProduction ? "-[contenthash]" : ""}.js`,
            minSize: 0,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    name: "main",
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});

/* DEV SERVER CONFIGURATION
 * ========================
 * This bit of config handles the behaviour of dev server, used for
 * quick development process, handling inline rebuilds and hot reloading of styles.
 * Only applied if the dev server is being used.
 */

isDevServer && configPartials.push({
    devServer: {
        host: "0.0.0.0",
        compress: true,
        contentBase: resolve(__dirname, "assets"),
        publicPath: "/",
        hot: true,
        serveIndex: false,
        transportMode: "ws"
    }
});

module.exports = require("webpack-merge")({

    mode: isProduction ? "production" : "development",

    entry: ["./styles/main.less", "./src/index.tsx"],
    output: {
        filename: `app${isProduction ? "-[contenthash]" : ""}.js`,
        path: resolve(__dirname, "dist")
    },
    resolve: {
        /* We add the root of the project as the first module directory
         * so that we can use root-relative paths for imports, and thus
         * do not have to change them in every moved file.
         */
        modules: [resolve(__dirname), resolve(__dirname, "node_modules")]
    },

    /* These options enable tree shaking regardless of mode of operation,
     * to ensure that even in dev environment dead code is removed (and if
     * it shouldn't be removed, that issues are caught in development).
     */
    optimization: {
        providedExports: true,
        usedExports: true,
        sideEffects: true
    },

    // Disable source maps for production, but enable the most thorough ones for dev
    devtool: isProduction ? false : "inline-source-map"

}, ...configPartials);
