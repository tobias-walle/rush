const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const createRules = require('./rules.config-creator');
const {CheckerPlugin} = require('awesome-typescript-loader');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

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

    resolve: {
      extensions: [
        '.ts', '.tsx', '.js', '.jsx'
      ],
      plugins: [
        new TsConfigPathsPlugin()
      ]
    },

    module: {
      rules: createRules(isProduction, 'tsconfig.client.json'),
    },

    plugins: [
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
        })
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