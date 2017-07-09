/**
 * @param {boolean} isProduction
 * @param {string} tsConfigFileName
 */
module.exports = (isProduction, tsConfigFileName) => {
  return [{
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
      test: /\.scss?$/,
      loaders: [
        'isomorphic-style-loader',
        ...(isProduction ? [
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ] : [
          'css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap'
        ])
      ]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    },
    {
      test: /\.json$/,
      use: 'json-loader'
    },
    ...(isProduction ? [] : [{
      test: /\.js$/,
      loader: 'source-map-loader',
      enforce: 'pre'
    }])
  ]
};