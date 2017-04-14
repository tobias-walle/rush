const webpack = require('webpack');
const merge = require('webpack-merge');

let webpackConfig;
if (process.env.NODE_ENV === 'production') {
  console.log('-- TEST PRODUCTION --');
  webpackConfig = require('./webpack.client.config.production');
} else {
  webpackConfig = require('./webpack.client.config.development');
}

module.exports = merge.smart({
  resolve: webpackConfig.resolve,
  module: webpackConfig.module,
  devtool: 'eval-inline-source-map'
}, {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            configFileName: 'tsconfig.spec.json'
          }
        }
      }
    ]
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
});
