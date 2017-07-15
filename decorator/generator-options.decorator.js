const {
  decorate
} = require('./decorator-utils');

module.exports = (func, generatorName, options) => (
  decorate(func, {
    prepend: {
      configuring: function () {
        const yoRcUtils = require('../utils/yo-rc-utils');
        const configuration = this.config.getAll();
        const defaultConfiguration = yoRcUtils.loadDefaultConfiguration(configuration, generatorName);
        applyDefaultsToOptions(this.options, defaultConfiguration);
      },
      default: function () {
        options.validate(this, generatorName);
      }
    },
    constructor: function () {
      options.applyOptions(this, generatorName);
    }
  })
);

function applyDefaultsToOptions(options, defaults) {
  Object.keys(defaults).forEach(optionKey => {
    const value = defaults[optionKey];
    if (value !== undefined) {
      options[optionKey] = options[optionKey] || value;
    }
  });
}

