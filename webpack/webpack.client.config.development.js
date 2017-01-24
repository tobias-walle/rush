let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');

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
    publicPath: '/dist/',
  },

  devtool: 'source-maps',

  resolve: {
    extensions: [
      '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    loaders: [
      {test: /\.tsx?$/, loaders: ['react-hot', 'awesome-typescript-loader']},
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'sass-loader?sourceMap'
      ]
      }
    ],

    preLoaders: [
      {test: /\.js$/, loader: 'source-map-loader'}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'}
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
