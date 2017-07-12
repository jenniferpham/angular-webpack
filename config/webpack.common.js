//Developers typically have separate configurations for development, production, and test environments. All three have a lot of common. Put common configurations in this file.
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: { //the entry-point files that define the bundles.
    'polyfills': './src/polyfills.ts', //the polyfills needed to run Angular applications in most modern browsers.
    'vendor': './src/vendor.ts', //the third-party dependencies such as Angular, lodash, and bootstrap.css.
    'app': './src/main.ts' //the application code.
  },

  resolve: { //how to resolve file names when they lack extensions. Most import statements don't mention the extension at all. Tell Webpack to resolve extension-less file requests by looking for matching files with .ts extension or .js extension (for regular JavaScript files and pre-compiled TypeScript files). If Webpack should resolve extension-less files for styles and HTML, add .css and .html to the list.
    extensions: ['.ts', '.js']
  },

  module: { //module is an object with rules for deciding how files are loaded. 
    rules: [ //Rules tell Webpack which loaders to use for each file, or module
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader', //a loader to transpile the Typescript code to ES5, guided by the tsconfig.json file.
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader' //loads angular components' template and styles.
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader' //for component templates
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, //Images and fonts are bundled
        loader: 'file-loader?name=assets/[name].[hash].[ext]' 
      },
      {
        test: /\.css$/, // matches application-wide styles. It excludes .css files within the src/app directory where the component-scoped styles sit.
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' }) //ExtractTextPlugin applies the style and css loaders to these files
      },
      {
        test: /\.css$/, //filters for component-scoped styles (the ones specified in a component's styleUrls metadata property) and loads them as strings via the raw-loader, which is what Angular expects to do with styles specified in a styleUrls metadata property.
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [ //creates instances of the plugins.
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({ //Of course the application code imports vendor code. On its own, Webpack is not smart enough to keep the vendor code out of the app.js bundle. The CommonsChunk does this.
    //The CommonsChunkPlugin identifies the hierarchy among three chunks: app -> vendor -> polyfills. Where Webpack finds that app has shared dependencies with vendor, it removes them from app. It would remove polyfills from vendor if they shared dependencies, which they don't.
      name: ['app', 'vendor', 'polyfills'] //The app.js bundle should contain only application code. All vendor code belongs in the vendor.js bundle.
    }),

    new HtmlWebpackPlugin({ //uses the publicPath and the filename settings in specific webpack.dev.ts or webpack.prod.ts to generate appropriate <script> and <link> tags into index.html
      template: 'src/index.html'
    })
  ]
};