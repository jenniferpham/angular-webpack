//You'll deploy the application and its dependencies to a real production server. You won't deploy the artifacts needed only in development. It puts the production output bundle files in the dist folder. Webpack generates file names with cache-busting hash (so you know they are different and updates online right away since the filename is different). Thanks to the HtmlWebpackPlugin, you don't have to update the index.html file when the hash changes.
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), //stops the build if there is an error.
    new webpack.optimize.UglifyJsPlugin({ //minifies the bundles: https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'), //extracts embedded css as external files, adding cache-busting hash to the filename.
    new webpack.DefinePlugin({ //use to define environment variables that you can reference within the application.
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({ //to override options of certain loaders.
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
});