const DefinePlugin = require("webpack").DefinePlugin;

const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = (env, argv) => ({
  devServer: {
    publicPath: "auto",
    hot: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  entry: "./src/index.ts",
  resolve: {
    extensions: [".dev.js", ".js", ".json", ".wasm", ".ts", ".tsx"],
    fallback: {
      crypto: false,
      path: false,
      fs: false,
      "react-native-sqlite-storage": false,
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
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(argv.mode),
      "process.env.PERF_BUILD": false,
    }),
  ],
  // plugins:
  //   argv.mode === "production"
  //     ? []
  //     : [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  devtool: false,
});
