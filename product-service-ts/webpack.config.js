module.exports = {
  // ...
  resolve: {
    extensions: ['.js','.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  // ...
};