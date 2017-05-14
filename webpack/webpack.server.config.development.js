const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const nodeExternals = require('webpack-node-externals');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

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

  devtool: 'eval-inline-source-map',
  cache: true,

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.jsx'
    ],
    plugins: [
      new TsConfigPathsPlugin(),
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            configFileName: 'tsconfig.server.json'
          }
        }
      },
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[hash].[ext]'
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
      'process.env.IS_SERVER_SIDE': JSON.stringify(true)
    }),
    new CheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
};
