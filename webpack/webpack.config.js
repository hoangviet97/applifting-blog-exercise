const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js"
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "..", "./src/index.html") }), new ReactRefreshWebpackPlugin()],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true
  }
};
