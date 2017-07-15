'use strict';
const Generator = require('yeoman-generator');

const ModuleGenerator = class extends Generator {
  initializing() {
    const {
      name,
      component,
      duck
    } = this.options;

    // Setup destination
    const destination = this.destinationPath('src', 'app', 'modules', name);

    // Setup other Generators
    if (component) {
      this.composeWith(require.resolve('../component'), {
        arguments: [name],
        noBasePath: true,
        destination: destination,
        flat: true
      });
    }
    if (duck) {
      this.composeWith(require.resolve('../duck'), {
        arguments: [name],
        moduleName: name,
        destination: destination
      });
    }
  }
};

const decorateGeneratorOptions = require('../../decorator/generator-options.decorator');
const options = require('../../configuration/module-options');

module.exports = decorateGeneratorOptions(ModuleGenerator, 'module', options);
