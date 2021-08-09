const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const path = require('path')

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8080,
    open: true,
    hot: true,
    overlay: true,  // 在浏览器抛错
    compress: true  //压缩
  }
})