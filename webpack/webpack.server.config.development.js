let webpack = require('webpack');
let fs = require('fs');
let path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
let CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let rootDir = path.resolve(__dirname, '..');

// Create a list of node_modules, so there are not bundled
let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

module.exports = {
  target: 'node',
  entry: {
    app: [
      './src/server.tsx',
    ]
  },
  output: {
    filename: 'server.js',
    path: rootDir + '/dist/server/',
  },

  devtool: 'source-maps',

  resolve: {
    extensions: [
      '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    rules: [
      {test: /\.tsx?$/, loaders: ['awesome-typescript-loader']},
      {test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap'
      ]},
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['server'], {
      root: path.resolve(__dirname, '..', 'dist'),
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'}
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ],

  externals: nodeModules
};
