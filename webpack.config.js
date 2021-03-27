const path = require('path');
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        app: './index.js'
    },
    output: {
        filename: `js/${fileName('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: `css/${fileName('css')}`
        }),
        new ImageminPlugin({
            test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
            disable: isDev,
            pngquant: {
                quality: '80-85'
            },
            jpegtran: {
                quality: '80-85'
            }
        }),
        // new CopyWebpackPlugin({
        //    patterns: [{
        //       from: path.resolve(__dirname, 'src/pages'),
        //        to: path.resolve(__dirname, 'dist')
        //    }]
        // })
    ],
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            publicPath: '/'
                        }
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/i,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                    }
                }],
            }
        ]
    }
}

function optimization() {
    const configObj = {
        splitChunks: {
            chunks: 'all' // разделение кода js
        }
    };

    if (isProd) {
        configObj.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ];
    }

    return configObj;
};
