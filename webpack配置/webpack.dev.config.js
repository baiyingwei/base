const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: '9999',
    hot: true,
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common, config);