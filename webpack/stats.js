const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./site.js');

module.exports = merge(config, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
    }),
  ],
});