const webpack = require('webpack');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/app/client.tsx',
    ],
    vendor: [
      'react',
      'react-dom',
      'redux'
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
        test: /\.tsx?$/, loaders: ['awesome-typescript-loader']
      },
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_SERVER_SIDE': JSON.stringify(false),
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/app/assets', to: 'assets'}
    ]),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
  ]
};
