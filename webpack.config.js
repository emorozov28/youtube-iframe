const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fileName = ext => isDev ? `[index].${ext}` : `index.${ext}`;

module.exports = () => ({
  context: path.resolve(__dirname, 'src'),
  entry: {
    script: './index.js'
  },
  devtool: isProd ? false : 'source-map',
  mode: 'development',
  output: {
    filename: `${fileName('js')}`,
    path: path.resolve(__dirname, 'demo'),
    publicPath: '',
    library: {
      name: 'LazyLoadYouTube',
      type: 'umd',
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'demo'),
    open: true,
    compress: true,
    hot: true,
    // port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      filename: 'index.html',
      minify: false,
      inject: false,
      removeComments: false
    }),
    new MiniCssExtractPlugin({
      filename: `${fileName('css')}`
    }),
    new CopyWebpackPlugin({
      patterns: [
          {
          from: path.resolve(__dirname, 'demo/index.css'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'demo/index.js'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'demo/img')
        }]
    })

  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
          minimize: {
            removeComments: false,
            collapseWhitespace: false,
          },
        },
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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

});
