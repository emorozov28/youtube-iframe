const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const config = {
    entry: './src/index.js',
    mode: 'production',
    output: {},
    devtool: isProd ? false : 'source-map',
    plugins: [],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
        ]
    }
};

const configDev = {
    ...config,
    output: {
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'demo'),
        filename: 'index.js'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: false
        }),
        new MiniCssExtractPlugin({filename: `index.css`}),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'demo/img')
            }
        ]
        })
    ],
}

const configProd = {
    ...config,
    output: {
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: `index.css`}),
    ],
}


module.exports = [configDev, configProd];
