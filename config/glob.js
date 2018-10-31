const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const fs = require('fs');
//js dirs
const js_modules = resolve(__dirname, '../src');
//view dirs
const view_modules = resolve(__dirname, '../views');

// dev common entry config
const entry_def = [
   'react-hot-loader/patch',
   // activate HMR for React

   'webpack-dev-server/client?http://0.0.0.0:8080',
   // bundle the client for webpack-dev-server
   // and connect to the provided endpoint

   'webpack/hot/only-dev-server',
   // bundle the client for hot reloading
   // only- means to only hot reload for successful updates
];


/*
 * Expose entries
 */

module.exports.getEntries = function(env) {
  let entries = { };
  glob.sync('**/index.js', { cwd: js_modules })
      .forEach(function(file) {
        let config;
        if (env == 'dev') {
          config = entry_def.concat('./' + file);
        } else {
          config = './' + file;
        }
        let filename = file.match(/^(\w+)\/index\.js$/)[1];
        entries[filename] = config;
      });
      // if (env == 'prod') { // not needed
        // entries['reactDOM'] = 'react-dom';
        // entries['react'] = 'react';
        // entries['moment'] = 'moment';
      // }
  return entries;
}


/*
 * Expose html plugins
 */

module.exports.getHtmlPlugins = function(env) {
  let htmlPlugin = [ ];
  let vendorChunks = [ ];
  if (env == 'prod') {
    // vendorChunks = ['react',];
    vendorChunks = ['reactDOM', 'react'];
  }

  fs.readdirSync(view_modules)
    .filter(function(file) {
      return ~file.search(/^[^\.].*\.html$/);
    })
    .forEach(function(file) {
      let filename = file.replace(/(\.html)$/, '');
      htmlPlugin.push(
        new HtmlWebpackPlugin({
        filename: file,
        template: resolve(__dirname, "../views/" + file),
        chunks: [ filename ].concat(vendorChunks)
      }));
    });
  return htmlPlugin;
}


   