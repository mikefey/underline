const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    path: `${__dirname}`,
    filename: 'build/app.build.js',
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:15]',
          'sass-loader?outputStyle=expanded&sourceMap',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
        ],
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
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
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
