/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

  output: {
    publicPath: '/assets/',     // 指定部署到服务器上的目录
    path: 'dist/assets/',       // 指定文件的解析目录
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/components/ReactPhotoWallApp.js',

  stats: {
    colors: true,           // 打印颜色差异？
    reasons: false
  },

  plugins: [        // 插件
    new webpack.optimize.DedupePlugin(),            // 监测消除重复的文件
    new webpack.optimize.UglifyJsPlugin(),          // js压缩
    new webpack.optimize.OccurenceOrderPlugin(),    // 按照引用频率，来生成模块id
    new webpack.optimize.AggressiveMergingPlugin(), // 合并相似的模块
    new webpack.NoErrorsPlugin()                    // 避免出错
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
