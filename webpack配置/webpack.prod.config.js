const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const config = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = merge(common, config);