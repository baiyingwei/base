const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack');
// const FirstPlugin = require('./webpack-firstPlugin.js');
module.exports = {
  // entry: {
  //   page1: './src/index.js',
  //   page2: './src/mian.js'
  // },
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:5].js',
    chunkFilename: 'chunk.[hash:5].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75
          }
        }]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, //配置外链不需要style-loader了！！！！！！！！！！！！！！！！！！
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }, 'less-loader']
      }, {
        test: /\.jpe?g|gif|png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '10240',
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    })
  ]
}