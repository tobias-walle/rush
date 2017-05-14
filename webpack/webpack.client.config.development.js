const webpack = require('webpack');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

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
    extensions: [
      '.ts', '.tsx', '.js', '.jsx'
    ],
    plugins: [
      new TsConfigPathsPlugin()
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
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap']
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[hash].[ext]'
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
    new CheckerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
};
