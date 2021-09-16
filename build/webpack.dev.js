const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    contentBase: '../dist',
    // progress: true, // 进度条
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新
  ],
});
