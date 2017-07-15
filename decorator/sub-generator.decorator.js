const pathUtils = require('./../utils/path-utils');
const {decorate} = require('./decorator-utils');

module.exports = function (func, generatorName, options) {
  return decorate(func, {
    prepend: {
      default: function () {
        options.validate(this, generatorName);
        pathUtils.updateDestinationOption(this, generatorName);
      }
    },
    constructor: function () {
      options.applyOptions(this, generatorName);
    }
  });
}
