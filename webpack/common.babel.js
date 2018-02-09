import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

export default {
  context: path.resolve(__dirname, '../src'),

  output: {
    library: 'munchkin',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      android: '4.4',
                      chrome: 49,
                      edge: 14,
                      firefox: 45,
                      ie: 11,
                      safari: 10,
                    },
                    /*
                     * Have to use `entry` instead of `usage` cause of
                     * Android & IE browser support in development env
                     */
                    useBuiltIns: 'entry',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new HtmlWebpackPlugin({
      favicon: './images/favicon.png',
      manifest: 'manifest.json',
      template: './index.ejs',
      title: 'All munchkins',
    }),
  ],

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    port: 3000,
    publicPath: '/',
    stats: {
      colors: true,
      progress: true,
    },
  },
};
