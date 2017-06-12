const path = require("path");
const webpack = require("webpack");

module.exports = {
  // devtool: 'eval',
  //
  devtool: "source-map",
  entry: ["./src/app"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.es5.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        include: path.join(__dirname, "src")
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve("/src")]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
