const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    entry: './src/react/index.tsx',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist/react'),
        filename: 'index.js',
        library: 'LazyLoadYouTube',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/react/public/index.html'),
            filename: 'index.html',
            minify: false,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@src': path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [{
                test: /\.module\.s[ac]ss$/i, // Для SCSS модулів
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i, // Для загальних SCSS
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/, // Для TypeScript
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    }
};
