var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        './js/bdIndex': './unpackage/src/Index.js',
        './js/bdMainform': './unpackage/src/Mainform.js',
        './js/bdBarcode': './unpackage/src/Barcode.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react&compact=false'
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
            loader: 'url-loader?limit=300000&name=[name]-[hash].[ext]'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new uglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new CommonsChunkPlugin(({
            name: "common.js",
            // (the commons chunk name)

            filename: "./js/common.js",
            // (the filename of the commons chunk)

            // minChunks: 3,
            // (Modules must be shared between 3 entries)

            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }))

    ]

};