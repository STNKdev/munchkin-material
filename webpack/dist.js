const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./common.js');

const srcPath = path.resolve(__dirname, '../src');

module.exports = merge.strategy({
  'module.rules': 'prepend',
})(config, {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          srcPath,
        ],
        loader: 'string-replace-loader',
        options: {
          search: 'webpackMode: "lazy"',
          replace: 'webpackMode: "eager"',
        },
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
