const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getPlugins = (isDev) => {
    const plugins = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `index.css`
        })
    ];

    if (isDev) {
        plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html',
                minify: false
            }),
            new CopyWebpackPlugin({
                patterns: [{
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'demo/img')
                }]
            })
        );
    }

    return plugins;
};

const baseConfig = {
    entry: './src/index.ts',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
};

const configDev = {
    ...baseConfig,
    output: {
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'demo'),
        filename: 'index.js',
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
    },
    plugins: getPlugins(true),
};

const configProd = {
    ...baseConfig,
    output: {
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    plugins: getPlugins(false),
};

module.exports = [configDev, configProd];
