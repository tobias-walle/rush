const webpackServerDevConfig = require('./webpack.server.config.development');
const path = require('path');
const merge = require('webpack-merge');

let rootDir = path.resolve(__dirname, '..');

module.exports = merge.smartStrategy({
  entry: 'replace',
  output: 'replace'
})(webpackServerDevConfig, {
  entry: [
    path.resolve(rootDir, 'src/api/api.entry.ts')
  ],
  output: {
    filename: 'api.js',
    path: path.resolve(rootDir, 'dist/api/'),
  },
});

