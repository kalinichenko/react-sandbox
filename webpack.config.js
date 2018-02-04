var webpack = require('webpack');
var api = require('./api');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + "/public",
    publicPath: "/public"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + "/public",
    compress: true,
    port: 3333,
    before(app) {
      api(app)
    }
  }
};