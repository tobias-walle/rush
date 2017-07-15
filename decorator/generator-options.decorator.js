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
    constructor: function () {
      const yoRcUtils = require('../utils/yo-rc-utils');
      const configuration = this.config.getAll();
      const defaultConfiguration = yoRcUtils.loadDefaultConfiguration(configuration, generatorName);
      applyDefaultsToOptions(options, defaultConfiguration);

      options.applyOptions(this, generatorName);
    }
  })
);

function applyDefaultsToOptions(optionCollection, defaults) {
  Object.keys(defaults).forEach(optionKey => {
    const value = defaults[optionKey];
    if (value !== undefined) {
      const option = optionCollection.get(optionKey);
      if (!option) {
        throw Error(`Default for unknown option "${optionKey}" is defined. Please remove the entry from you .yo-rc.json file`);
      }
      option.setDefault(value);
    }
  });
}

