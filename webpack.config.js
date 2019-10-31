'use strict'

const { resolve } = require('path')

module.exports = {
  entry: ['babel-polyfill', './app/index'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /(jsx|js)?$/,
        include: resolve(__dirname, './app'),
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
