let webpack = require('webpack');
let webpackConfig;

webpackConfig = require('./webpack/webpack.spec.config');

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

    webpack: webpackConfig,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};