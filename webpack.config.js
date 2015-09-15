var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: [
    "webpack/hot/dev-server",
    "./src/app.ts"
  ],
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      { test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")  },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader?limit=100000" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new NgAnnotatePlugin({ add: true })    
  ],
  devServer: {
    contentBase: "./src"
  }
};
