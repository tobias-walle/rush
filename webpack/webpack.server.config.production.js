let webpack = require('webpack');
let fs = require('fs');
let path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');

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
      'babel-polyfill',
      './src/app/server.tsx',
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
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap'
      ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },

  externals: nodeModules,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_SERVER_SIDE': JSON.stringify(true),
    }),
    new CheckerPlugin(),
  ]
};
