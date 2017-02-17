let webpackConfig = require('./webpack/webpack.client.config.development');

module.exports = (config) => {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
    ],

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '**/*.spec.ts*'
    ],

    preprocessors: {
      '**/*.ts*': ['webpack'],
    },

    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      node: {
        fs: 'empty'
      }
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Chromium'],
    singleRun: false
  })
};