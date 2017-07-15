const pathUtils = require('./../utils/path-utils');
const {decorate} = require('./decorator-utils');
const decorateGenerator = require('./generator-options.decorator');

module.exports = (func, generatorName, options) => (
  decorate(decorateGenerator(func, generatorName, options), {
    prepend: {
      default: function () {
        pathUtils.updateDestinationOption(this, generatorName);
      }
    }
  })
)
