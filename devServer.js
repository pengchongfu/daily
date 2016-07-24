var webpack = require('webpack');
var WebPackDevServer = require('webpack-dev-server');
var config = require("./webpack-dev-server.config");

new WebPackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }
})