const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const createRules = require('./rules.config-creator');
const createResolve = require('./resolve.config-creator');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = (isProduction) => {
  const config = {
    entry: {
      app: [
        ...(isProduction ? [] : ['react-hot-loader/patch']),
        './src/app/client.entry.tsx',
      ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(rootDir, 'dist/client/'),
      publicPath: '/static/',
    },

    devtool: 'source-maps',
    cache: true,

    resolve: createResolve(isProduction),

    module: {
      rules: createRules(isProduction, 'tsconfig.client.json'),
    },

    plugins: [
      new CopyWebpackPlugin([{
        from: './src/app/assets',
        to: 'assets'
      }]),
      new webpack.DefinePlugin({
        'process.env.IS_SERVER_SIDE': JSON.stringify(false),
        'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development'),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []), // Activate the bundle anlyzer with the ANALYZE environment variable
      new CheckerPlugin(),
      ...(isProduction ? [
        new ManifestPlugin(),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          output: {
            comments: false
          },
          sourceMap: false
        })
      ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
          debug: true
        }),
      ])
    ],
  }

  if (!isProduction) {
    Object.assign(config, {
      devServer: {
        hot: true,
        contentBase: path.resolve(rootDir, 'dist/client/'),
        publicPath: '/static/'
      }
    });
  }

  return config;
};