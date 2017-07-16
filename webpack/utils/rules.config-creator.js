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
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: isProduction ? Infinity : 8192,
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