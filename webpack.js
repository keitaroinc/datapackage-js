const _ = require('lodash')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ENV = process.env.NODE_ENV || 'development'


// Base

let webpackConfig = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: { library: 'JSONTableSchema', libraryTarget: 'umd' },
  node: {
    fs: 'empty'
  }
}


// Development

if (ENV === 'development') {
  webpackConfig = merge(webpackConfig, {
    output: {
      filename: 'jsontableschema.js',
      path: './dist'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  });
}


// Production

if (ENV === 'production') {
  webpackConfig = merge(webpackConfig, {
    output: {
      filename: 'jsontableschema.min.js',
      path: './dist'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
    ]
  });
}


module.exports = webpackConfig