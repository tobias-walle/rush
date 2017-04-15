const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app: [
      './src/app/client.entry.tsx',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(rootDir, 'dist/client/'),
    publicPath: '/static/',
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
        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader']
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
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_SERVER_SIDE': JSON.stringify(false),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
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
  ]
};
