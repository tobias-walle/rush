const webpackServerProdConfig = require('./webpack.server.config.production');
const path = require('path');
const merge = require('webpack-merge');

let rootDir = path.resolve(__dirname, '..');

module.exports = merge.smartStrategy({
  entry: 'replace',
  output: 'replace'
})(webpackServerProdConfig, {
  entry: [
    path.resolve(rootDir, 'src/api/api.entry.ts')
  ],
  output: {
    filename: 'api.js',
    path: path.resolve(rootDir, 'dist/api/'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            configFileName: 'tsconfig.api.json'
          }
        }
      }
    ]
  },
});

