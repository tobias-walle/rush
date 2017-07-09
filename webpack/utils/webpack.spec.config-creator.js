const webpack = require('webpack');
const merge = require('webpack-merge');
const createRules = require('./rules.config-creator');

module.exports = (isProduction) => {
  const webpackConfig = isProduction 
    ? require('../webpack.client.config.production')
    : require('../webpack.client.config.development');

  return merge.smart({
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
    devtool: 'inline-source-map'
  }, {
    module: {
      rules: createRules(isProduction, 'tsconfig.api.json')
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: null, // Sourcemap is inlined
        test: /\.(ts|tsx|js|jsx)($|\?)/i
      }),
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
    ],
    node: {
      fs: 'empty'
    },
    // Add this to resolve errors with enzyme
    externals: {
      'cheerio': 'window',
      'react/addons': true, // important!!
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  })
};