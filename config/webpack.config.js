const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'index.js',
    libraryTarget: "umd",
    library: "ImagesPlayer"
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}