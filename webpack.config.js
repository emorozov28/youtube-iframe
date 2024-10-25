const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getPlugins = (isDev) => {
    const plugins = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `index.css`,
        }),
    ];

    if (isDev) {
        plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/core/index.html'),
                filename: 'index.html',
                minify: false,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/img'),
                        to: path.resolve(__dirname, 'demo/core/img'),
                    },
                ],
            })
        );
    }

    return plugins;
};

const baseConfig = {
    entry: './src/core/index.ts',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          '@src': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
};

const configCoreDev = {
    ...baseConfig,
    output: {
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'demo/core'),
        filename: 'index.js',
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
    },
    plugins: getPlugins(true),
};

const configCoreProd = {
    ...baseConfig,
    output: {
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist/core'),
        filename: 'index.js',
    },
    plugins: getPlugins(false),
};

module.exports = [configCoreDev, configCoreProd];
