const createWebpackSpecConfig = require('./utils/webpack.spec.config-creator');

if (process.env.NODE_ENV === 'production') {
  console.log('-- TEST PRODUCTION --');
  module.exports = createWebpackSpecConfig(true);
} else {
  module.exports = createWebpackSpecConfig(false);
}
