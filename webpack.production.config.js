const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');

const offline = new OfflinePlugin({
  externals: [
    'index.html',
    'assets/styles/app.css',
    'assets/images/add-book-icon-white.png',
    'assets/js/epub.min.js',
    'assets/js/jszip.min.js',
  ],
});

module.exports = {
  entry: ['babel-polyfill', './src/js/app.js'],
  output: {
    path: '',
    filename: 'build/app.build.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:15]',
            'sass-loader?outputStyle=expanded&sourceMap',
            'resolve-url-loader',
          ],
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=8192',
          'img-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loaders: [
          'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'build/app.build.css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compressor: {
        warnings: false,
      },
    }),
    offline,
  ],
  resolve: {
    modules: [
      path.resolve('./src/js'),
      path.resolve('./src/styles'),
      path.resolve('./assets/images'),
      path.resolve('./node_modules'),
    ],
  },
};
