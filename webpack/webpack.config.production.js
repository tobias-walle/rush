let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      'core-js/shim',
      'react',
      'react-dom'
    ],
    app: [
      './src/client/index.tsx',
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/client/',
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
        'style-loader',
        'css-loader?modules',
        'sass-loader'
      ]
      }
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/client/assets', to: 'assets'}
    ]),
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
