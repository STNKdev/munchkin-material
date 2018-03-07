import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import common from './common.babel';
import manifest from './manifest';

const config = merge.smart(common, {
  entry: ['./polyfill.js', './offline.js', './site.js', './index.jsx'],

  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../site'),
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
          publicPath: 'fonts/',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../site'), {
      allowExternal: true,
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new CnameWebpackPlugin({
      domain: 'web.allmunchkins.com',
    }),

    new HtmlWebpackPlugin({
      favicon: './images/favicon.png',
      filename: 'ru.html',
      manifest: 'manifest-ru.json',
      template: './index.ejs',
      title: 'Все манчкины',
    }),

    new WebpackPwaManifest({
      ...manifest,
      filename: 'manifest-ru.json',
      name: 'Все манчкины',
      short_name: 'Все манчкины',
    }),

    new webpack.HashedModuleIdsPlugin(),

    new OfflinePlugin({
      caches: {
        main: ['*.html', 'js/main.*.js'],
        additional: ['js/*.js', 'fonts/**'],
        optional: [':rest:'],
      },
      excludes: ['CNAME'],
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
      },
    }),
  ],
});

export default config;
