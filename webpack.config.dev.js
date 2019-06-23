const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const config = {
  entry: {
    "drapdropsystem.min": "./src/index.js"
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/")
    }
  },
  devtool: "inline-source-map",
  devServer: {
    port: 5000,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: "minimal",
    inline: true,
    compress: true,
    contentBase: "./dist"
  },
  module: {
    rules: [{ use: "babel-loader", test: /\.js$/, exclude: /node_modules/ }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "src/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "development"
    })
  ]
};
module.exports = config;
