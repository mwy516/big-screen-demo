const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin'); //提取html 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取单一css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //css 优化
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const envConfig = require('./../config');
console.log('当前api-path----' + envConfig.api);

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
  output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    path: path.resolve(__dirname, '../dist/'),
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
    // 以下文件不需要写后缀名就可以导入
    extensions: ['*', '.js', '.json', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.(css|less)$/,
        use: [
          // 'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: [path.resolve(__dirname, '../node_modules')],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 6 * 1024, // 6kb  指定大小
          },
        },
        generator: {
          filename: 'img/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        type: 'asset',
        generator: {
          filename: 'video/[name].[hash:6].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        exclude: [path.resolve(__dirname, '../node_modules')],
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:6].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // minimize: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), //生产优化
    ],
    //minimize:true,//开启开发优化
  },
  plugins: [
    new webpack.DefinePlugin({
      envConfig: JSON.stringify(envConfig),
    }),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: '测试',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[id].css',
    }),
    new vueLoaderPlugin(),
    require('autoprefixer'),
  ],
};
