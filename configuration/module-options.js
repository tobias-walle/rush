const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const {
  GeneratorOption
} = require('../models/generator-option');
const validate = require('../utils/validate-utils');

const options = new GeneratorOptionCollection([
  new GeneratorOption('name', {
    type: 'argument',
    cliOptions: {
      type: String,
      required: true,
      desc: 'The name of the module'
    },
    validate: (name) => {
      if (name === undefined) {
        this.env.error('The component name has to be defined');
      }
      if (!validate.isLispCase(name)) {
        this.env.error('Only lower case characters and hyphens are allowed in the component name');
      }
    }
  }),
  new GeneratorOption('component', {
    cliOptions: {
      type: Boolean,
      default: true,
      desc: 'Generate an component for this module'
    }
  }),
  new GeneratorOption('duck', {
    cliOptions: {
      type: Boolean,
      default: true,
      desc: 'Generate a duck file for this module'
    }
  }),
]);

module.exports = options;
