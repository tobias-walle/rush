const webpack = require('webpack');
const webpackServerDevConfig = require('./webpack.server.config.development');
const merge = require('webpack-merge');

module.exports = merge.smartStrategy({
  plugins: 'replace'
})(webpackServerDevConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_SERVER_SIDE': JSON.stringify(true)
    }),
  ]
});

