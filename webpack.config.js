module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    'core-js/shim',
    './src/index.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/dist/'
  },

  devtool: 'source-maps',

  devServer: {
    progress: true,
    contentBase: "./"
  },

  resolve: {
    extensions: [
      '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    loaders: [
      {test: /\.tsx?$/, loaders: ['awesome-typescript-loader']},
      {test: /\.scss?$/, loaders: ['style-loader', 'css-loader?sourceMap&modules', 'postcss-loader', 'sass-loader?sourceMap']}
    ],

    user: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ]
          }
        }
      }
    ],

    preLoaders: [
      {test: /\.js$/, loader: 'source-map-loader'}
    ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  }
};
