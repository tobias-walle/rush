const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

let rootDir = path.resolve(__dirname, '..');

module.exports = {
  target: 'node',
  entry: [
    path.resolve(rootDir, 'src/app/server.entry.tsx'),
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(rootDir, 'dist/server/'),
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.jsx'
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, loaders: ['awesome-typescript-loader']
      },
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },

  externals: [nodeExternals()],

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_SERVER_SIDE': JSON.stringify(true)
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      {from: path.resolve(rootDir, 'src/app/assets'), to: 'assets'}
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
};
