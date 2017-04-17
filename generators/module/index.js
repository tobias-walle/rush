'use strict';
const Generator = require('yeoman-generator');
const validate = require('../../utils/validate-utils');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // Setup object for custom settings
    this.settings = {};

    this.argument('name', {
      type: String,
      required: true,
      desc: 'The name of the module'
    });
  }

  initializing() {
    const name = this.options.name;

    // Check if name is valid
    if (name === undefined) {
      this.env.error('The component name has to be defined');
    }
    if (!validate.isLispCase(name)) {
      this.env.error('Only lower case characters and hyphens are allowed in the component name');
    }

    // Setup destination
    this.settings.destination = this.destinationPath('src', 'app', 'modules', name);

    // Setup other Generators
    this.composeWith(require.resolve('../component'),
      {
        arguments: [name],
        noBasePath: true,
        destination: this.settings.destination,
        flat: true
      }
    );
    this.composeWith(require.resolve('../duck'),
      {
        arguments: [name],
        moduleName: name,
        destination: this.settings.destination
      }
    );
  }

  writing() {
  }
};
