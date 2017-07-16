const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

module.exports = (isProduction) => {
  return {
      extensions: [
        '.ts', '.tsx', '.js', '.jsx'
      ],
      plugins: [
        new TsConfigPathsPlugin()
      ],
  };
}