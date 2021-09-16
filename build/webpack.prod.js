const base = require('./webpack.base.js');
const { merge } = require('webpack-merge'); // 合并配置
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩 js

module.exports = merge(base, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    // new CopyWebpackPlugin([{
    //     from: path.resolve(__dirname, '../public'),
    //     to: path.resolve(__dirname, '../dist')
    // }]),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        //压缩js
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
      },
    },
  },
});
