const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:3000');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  entry: getEntrySources(['babel-polyfill', './src/js/app.js']),
  output: {
    publicPath: '/',
    path: '/',
    filename: 'build/app.build.js',
  },
  devtool: 'eval',
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
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'build/app.build.css', allChunks: true }),
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
