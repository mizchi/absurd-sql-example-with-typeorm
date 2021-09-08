const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    publicPath: "/",
    hot: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  entry: "./src/index.ts",
  mode: "development",
  resolve: {
    extensions: [".dev.js", ".js", ".json", ".wasm", ".ts", ".tsx"],
    fallback: {
      crypto: false,
      path: false,
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
