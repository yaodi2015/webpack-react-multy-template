'use strict';
/*
 * Module dependencies
 */
const resolve = require('path').resolve;
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base');
const { getEntries } = require('./glob');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * Expose webpack config
 */
module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    context: resolve(__dirname, '../src'),
    entry: getEntries(env),
    output: {
      filename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [ 'css-loader', 
                   'sass-loader', 
                   'postcss-loader'
                ]
          })
        }
      ]
    },

    devtool: 'cheap-source-map',
    plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
          }
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
              screw_ie8: true,
              keep_fnames: true
          },
          compress: {
              screw_ie8: true
          },
          comments: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "moment",

        // filename: "vendor.js"
        // (Give the chunk a different name)

        minChunks: 2,
        // (with more entries, this ensures that no other module
        //  goes into the vendor chunk)
        chunks: ['beauty', 'index']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'react',

        // filename: "vendor.js"
        // (Give the chunk a different name)

        minChunks: 2,
        // (with more entries, this ensures that no other module
        //  goes into the vendor chunk)
        chunks: ['form', 'moment']
      }),
      //Transfer files to the build directory
      new TransferWebpackPlugin([
          { from: 'libs', to: 'libs' },
        ],
        resolve(__dirname, '../src')
      ),
      //separate css file
      new ExtractTextPlugin("[name].[chunkhash].css")
    ],
  })
};