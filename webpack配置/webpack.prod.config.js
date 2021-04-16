const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
}

module.exports = merge(common, config);