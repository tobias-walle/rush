const {
  createDestinationOptions
} = require('../utils/create-destination-options');

const buildSubGeneratorOptions = (generatorName, ownOptions) => {
  const options = createDestinationOptions(generatorName);
  options.mergeWith(ownOptions);
  return options;
};

module.exports = {
  buildSubGeneratorOptions
};
