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
    publicPath: '/',
  },

  resolve: {
    extensions: [
      '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    loaders: [
      {test: /\.tsx?$/, loaders: ['awesome-typescript-loader']},
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'sass-loader'
      ]
      }
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'}
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
};
