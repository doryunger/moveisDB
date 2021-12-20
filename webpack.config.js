const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = {
    entry: './src/main.ts',
    resolve: {
        extensions: ['.ts', '.js','.css'],
        alias: {
            '@': path.resolve(__dirname, 'src/app/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // workaround for warning: System.import() is deprecated and will be removed soon. Use import() instead.
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true }
            },
            {
                test: /\.css$|\.scss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                    loader: "resolve-url-loader",
                    options: { includeRoot: true }
                  },
                  {
                    loader: "sass-loader",
                    options: {
                      sourceMap: true,
                      includePaths: [
                        path.resolve("./node_modules")
                      ]
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.DefinePlugin({
            // global app config object
            config: JSON.stringify({
                apiUrl: 'http://localhost:4000'
            })
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].css"
          }),

        // workaround for warning: Critical dependency: the request of a dependency is an expression
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            path.resolve(__dirname, 'src')
        )
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true
    },
    devServer: {
        historyApiFallback: true
    }
}