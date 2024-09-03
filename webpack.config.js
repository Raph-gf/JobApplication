module.exports = {
  mode: "production",
  entry: "./src/script.js",
  output: {
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
