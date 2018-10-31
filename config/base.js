'use strict';
/*
 * Modules dependencies
 */
const webpack = require('webpack');
const { resolve } = require('path');
const { getHtmlPlugins } = require('./glob');
/*
 * Expose config
 */
module.exports = function(env) {
	return {
		context: resolve(__dirname, '../src'),
		output: {
		  // the output bundle
		  path: resolve(__dirname, '../dist')
		},
		module: {
		  rules: [
		    {
		      test: /\.jsx?$/,
		      use: [ 'babel-loader', ],
		      exclude: /node_modules/
		    },
		    {
		      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		      use: [{
		      	loader:'url-loader',
		    	  options: {
		    	    limit: 10000,
		    	    name: 'images/[name].[hash:7].[ext]'
		    	  }
		    	}]
		    },
		    {
		      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		      use: [{
		      	loader:'url-loader',
		    	  options: {
		    	    limit: 10000,
		    	    name: 'fonts/[name].[hash:7].[ext]'
		    	  }
		    	}]
		    }
		  ],
		},
		externals: {
			'moment': 'moment'
		},
		plugins: getHtmlPlugins(env).concat([
			
		])
	}
}