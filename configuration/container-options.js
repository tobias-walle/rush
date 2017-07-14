const {
  buildSubGeneratorOptions
} = require('../utils/build-sub-generator-options');
const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const {
  GeneratorOption
} = require('../models/generator-option');

module.exports = buildSubGeneratorOptions(
  'container',
  new GeneratorOptionCollection([
    new GeneratorOption('componentName', {
      cliOptions: {
        type: String,
        desc: `The name of the component this container extends. If not set, this will be the same as the container name`
      }
    })
  ])
);
