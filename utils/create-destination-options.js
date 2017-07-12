const {
  GeneratorOption
} = require('../models/generator-option');
const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const validate = require('./validate-utils');

function createDestinationOptions(generatorName) {
  return new GeneratorOptionCollection([
    new GeneratorOption('name', {
      cliOptions: {
        type: String,
        required: true,
        desc: (generatorName) => `The name of the ${generatorName}`
      },
      validate: (value) => {
        if (!validate.validateName(value)) {
          return `Only lower case characters and hyphens are allowed in the ${generatorName} name`;
        }
      }
    }),
    new GeneratorOption('module', {
      cliOptions: {
        alias: 'm',
        type: String,
        desc: (generatorName) => `The destination module of the ${generatorName}`
      }
    }),
    new GeneratorOption('destination', {
      cliOptions: {
        alias: 'd',
        type: String,
        desc: (generatorName) => `The destination folder of the ${generatorName}`
      }
    }),
    new GeneratorOption('noBasePath', {
      cliOptions: {
        type: String,
        desc: 'Ignore the base path from the .yo-rc configuration'
      }
    }),
  ]);
}

module.exports = {
  createDestinationOptions
}
