const {
  decorate
} = require('./decorator-utils');

module.exports = (func, generatorName, options) => (
  decorate(func, {
    prepend: {
      default: function () {
        options.validate(this, generatorName);
      }
    },
    constructor: function() {
      options.applyOptions(this, generatorName);
    }
  })
);
