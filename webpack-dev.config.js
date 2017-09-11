var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: getEntrySources(['./scripts/client.js']),
    html: './index.html'
  },
  devtool: process.env.NODE_ENV === 'production' ? "eval" : "source-map",
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js',
    path: 'public'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['img', 'url?limit=8192']
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ] : [],
  postcss: function() {
    return [autoprefixer, precss]
  },
  sassLoader: function() {
    includePaths: [path.join(__dirname, 'app', 'styles')]
  }
}

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/dev-server'); //only
  }

  return sources;
}
