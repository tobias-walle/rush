const {
  buildSubGeneratorOptions
} = require('../utils/build-sub-generator-options');
const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const {
  GeneratorOption
} = require('../models/generator-option');
const validate = require('../utils/validate-utils');

module.exports = buildSubGeneratorOptions(
  'duck',
  new GeneratorOptionCollection([
    new GeneratorOption('elements', {
      type: 'argument',
      cliOptions: {
        type: String,
        desc: 'What actions should the duck have (lowercase, separated by a space)? ' +
          'For example "get get-all delete" will create the actions "app/<module>/GET", ' +
          '"app/<module>/GET_ALL" and "app/<module>/DELETE" and the associated action creators and' +
          ' reducers.',
        default: ''
      },
      validate: elements => {
        if (!validate.isLispCase(elements, {
          withSpaces: true
        })) {
          return 'Only lowercase characters, hyphens and spaces are allowed.';
        }
      }
    })
  ])
);
