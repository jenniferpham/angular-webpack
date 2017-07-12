//The development build relies on the Webpack development server, configured near the bottom of the file. Although you tell Webpack to put output bundles in the dist folder, the dev server keeps all bundles in memory; it doesn't write them to disk. You won't find any files in the dist folder, at least not any generated from this development build.
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css') //The ExtractTextPlugin extracts them into external .css files that the HtmlWebpackPlugin (from webpack.common.js) inscribes as <link> tags into the index.html (CSS styles are buried inside the Javascript bundles by default).
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});