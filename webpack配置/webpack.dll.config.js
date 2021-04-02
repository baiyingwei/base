const path = require('path');
const Webpack = require('webpack');
module.exports = {
  entry: {
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].dll.js',
    library: '[name]_dll_[hash]'
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.join(__dirname, 'build', '[name]-manifest.json'),
      name: '[name]_dll_[hash]'
    })
  ]
}

