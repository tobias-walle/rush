let webpack = require('webpack');
let webpackConfig;

if (process.env.NODE_ENV === 'production') {
  console.log('-- TEST PRODUCTION --');
  webpackConfig = require('./webpack/webpack.client.config.production');
} else {
  webpackConfig = require('./webpack/webpack.client.config.development');
}

module.exports = (config) => {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-phantomjs-launcher'),
    ],

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './src/test.ts' },
    ],

    preprocessors: {
      './src/test.ts': ['webpack'],
    },

    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      devtool: 'inline-source-map',
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
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};