const webpack = require('webpack');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/app/client.entry.tsx',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(rootDir, 'dist/client/'),
    publicPath: '/static/',
  },

  devtool: 'eval-source-maps',
  cache: true,

  devServer: {
    hot: true,
    contentBase: path.resolve(rootDir, 'dist/client/'),
    publicPath: '/static/'
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(rootDir, 'src')
    ],
    extensions: [
      '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            configFileName: 'tsconfig.client.json'
          }
        }
      },
      {
        test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap']
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_SERVER_SIDE': JSON.stringify(false)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new CopyWebpackPlugin([
      {from: 'src/app/assets', to: 'assets'}
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
};
