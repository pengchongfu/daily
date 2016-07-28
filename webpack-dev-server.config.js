var webpack = require("webpack")
var path = require("path")
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    dev: [
      `webpack-dev-server/client?http://localhost:8000`,
      `webpack/hot/only-dev-server`,
    ],
    index: './src/index.jsx',
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
    publicPath: `http://localhost:8000/static/`
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot', 'babel']
      },
      { test: /\.css$/,
        loader: "style!css"
      },
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}