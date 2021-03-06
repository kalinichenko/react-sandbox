var webpack = require('webpack');
var api = require('./api');

var PORT = 3000;

module.exports = {

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`, // inline mode
    'webpack/hot/dev-server', // reloads when applying HMR fails
    // 'webpack/hot/only-dev-server', // doesn't reload
    './src/index.js'
  ],
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
    hot: true,
    historyApiFallback: true,
    contentBase: __dirname + "/public",
    compress: true,
    port: PORT,
    before(app) {
      api(app)
    }
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ]
};