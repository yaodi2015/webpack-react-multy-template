'use strict';
/*
 * Moudle dependencies
 */

const { resolve, join } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base');
const { getEntries } = require('./glob');
 
/*
 * Webpack config
 */
module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    context: resolve(__dirname, '../src'),
    entry: getEntries(env),
    output: {
      filename: '[name].bundle.js',
      // necessary for HMR to know where to load the hot update chunks
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 
                 'css-loader',
                 'sass-loader', 
                 'postcss-loader'
                ],
        }
      ]
    },
    devtool: 'inline-source-map',

    devServer: {
      host: "0.0.0.0",
      hot: true,
      // enable HMR on the server

      contentBase: resolve(__dirname, '../'),
      // match the output path
      publicPath: '/',
      // match the output `publicPath`
      "proxy": {
        "/api": {
            target: "http://gank.io",
            changeOrigin: true
          }
      }
    },

    plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('dev')
          }
      }),
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates

    ],
  })
};