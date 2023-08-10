const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/",
  output: {
	path: path.resolve(__dirname, "build"),
	filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
	new HtmlWebPackPlugin({
	  template: './src/index.html'
	})
  ],
  devServer: {
    port: 3000,
    liveReload: true,
    // host 지정
    host: "0.0.0.0",
    allowedHosts: "all",
    open: true,
    client: {
      overlay: true,
      // 웹소켓 설정
      webSocketURL: { hostname: undefined, pathname: undefined, port: '0' },
    },
    compress: true,
  }
};