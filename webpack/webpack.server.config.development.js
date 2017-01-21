let webpack = require('webpack');
let fs = require('fs');
let path = require('path');

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
      './src/server/index.ts',
    ]
  },
  output: {
    filename: 'server.js',
    path: rootDir + '/dist/server/',
    publicPath: '/dist',
  },

  devtool: 'source-maps',

  resolve: {
    extensions: [
      '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    loaders: [
      {test: /\.tsx?$/, loaders: ['awesome-typescript-loader']},
    ],
    preLoaders: [
      {test: /\.js$/, loader: 'source-map-loader'}
    ]
  },

  externals: nodeModules
};
