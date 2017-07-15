const loadDefaultConfiguration = (configuration, generatorName) => {
  if (!configuration || !configuration.defaults) {
    return {};
  }
  return configuration.defaults[generatorName] || {};
};

const createInitialDefaultConfiguration = () => {
  const configuration = require('../configuration');
  const defaults = {};
  Object.keys(configuration).forEach(generatorName => {
    defaults[generatorName] = {};
  });
  return defaults;
};

module.exports = {
  loadDefaultConfiguration,
  createInitialDefaultConfiguration
};