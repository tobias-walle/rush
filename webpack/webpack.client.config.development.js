let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');

let rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ],
    app: [
      './src/client.tsx',
    ]
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

