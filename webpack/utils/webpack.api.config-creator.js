const webpackServerDevConfig = require('../webpack.server.config.development');
const webpackServerProdConfig = require('../webpack.server.config.development');
const createRules = require('./rules.config-creator');
const path = require('path');
const merge = require('webpack-merge');

let rootDir = path.resolve(__dirname, '..', '..');

module.exports = (isProduction) => merge.smartStrategy({
  entry: 'replace',
  output: 'replace',
})(isProduction ? webpackServerProdConfig : webpackServerDevConfig, {
    entry: [
      path.resolve(rootDir, 'src/api/api.entry.ts')
    ],
    output: {
      filename: 'api.js',
      path: path.resolve(rootDir, 'dist/api/'),
    },
    module: {
      rules: createRules(isProduction, 'tsconfig.api.json')
    },
  });