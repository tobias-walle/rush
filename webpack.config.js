let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    'core-js/shim',
    './src/client/index.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/client/',
    publicPath: '/dist/client/'
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
      {test: /\.scss?$/, loaders: [
        'style-loader',
        'css-loader?sourceMap&modules',
        'sass-loader?sourceMap'
      ]}
    ],

    preLoaders: [
      {test: /\.js$/, loader: 'source-map-loader'}
    ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/client/assets', to: 'assets'}
    ]),
  ],
};
