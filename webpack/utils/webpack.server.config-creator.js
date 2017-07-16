const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const createRules = require('./rules.config-creator');
const createResolve = require('./resolve.config-creator');
const {
  CheckerPlugin
} = require('awesome-typescript-loader');

let rootDir = path.resolve(__dirname, '..', '..');

module.exports = (isProduction) => {
  const config = {
    target: 'node',
    entry: [
      path.resolve(rootDir, 'src/app/server.entry.tsx'),
    ],
    output: {
      filename: 'server.js',
      path: path.resolve(rootDir, 'dist/server/'),
    },

    devtool: 'inline-source-map',
    cache: true,

    resolve: createResolve(isProduction),

    module: {
      rules: createRules(false, 'tsconfig.server.json'), // Always create rules for development, because source maps should always available on the server
    },

    externals: [nodeExternals()],

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development'),
        'process.env.IS_SERVER_SIDE': JSON.stringify(true)
      }),
      new CheckerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      ...(isProduction ? [] : [
        new webpack.LoaderOptionsPlugin({
          debug: true
        })
      ])
    ],
  };

  return config;
};