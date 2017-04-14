const webpack = require('webpack');
const webpackServerDevConfig = require('./webpack.server.config.development');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

let rootDir = path.resolve(__dirname, '..');

module.exports = merge.smartStrategy({
  plugins: 'replace'
})(webpackServerDevConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_SERVER_SIDE': JSON.stringify(true)
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(rootDir, 'src/app/assets'), to: 'assets'}
    ]),
  ]
});

