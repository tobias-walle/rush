let webpack = require('webpack');
let path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

let rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/client.tsx',
    ],
    vendor: [
      'react-hot-loader/patch',
      'react',
      'react-dom'
    ],
  },
  output: {
    filename: 'bundle.js',
    path: rootDir + '/dist/client/',
    publicPath: '/static/',
  },

  devtool: 'source-maps',

  resolve: {
    extensions: [
      '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader']
      },
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap']
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['client'], {
      root: path.resolve(__dirname, '..', 'dist'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'}
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
};
