const {
  createDestinationOptions
} = require('../utils/create-destination-options');
const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const {
  GeneratorOption
} = require('../models/generator-option');

const buildSubGeneratorOptions = (generatorName, ownOptions) => {
  const options = createDestinationOptions(generatorName);
  options.mergeWith(ownOptions);
  return options;
}

module.exports = {
  buildSubGeneratorOptions
};
