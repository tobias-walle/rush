const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (isProduction) => {
  const webpackConfig = isProduction 
    ? require('../webpack.client.config.production')
    : require('../webpack.client.config.development');

  return merge.smart({
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
    devtool: 'eval-inline-source-map'
  }, {
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            configFileName: 'tsconfig.spec.json'
          }
        }
      }]
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