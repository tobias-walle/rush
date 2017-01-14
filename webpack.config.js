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
      {test: /\.tsx?$/, loaders: ['awesome-typescript-loader']}
    ],

    preLoaders: [
      {test: /\.js$/, loader: 'source-map-loader'}
    ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  }
}
