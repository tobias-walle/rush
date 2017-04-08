'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const validate = require('../../utils/validate-utils');
const utils = require('../../utils/general-utils');
const pathUtils = require('../../utils/path-utils');

const generatorName = 'component';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: true,
      desc: 'The name of the component'
    });

    pathUtils.setupDestinationOptions(this, generatorName);

    this.option('flat', {
      alias: 'f',
      type: Boolean,
      desc: 'If True, there will be no folder created for this component'
    });
  }

  initializing() {
    // Check if name is valid
    const name = this.options.name;
    if (name === undefined) {
      this.env.error('The component name has to be defined');
    }
    if (!validate.isLispCase(name)) {
      this.env.error('Only lower case characters and hyphens are allowed in the component name');
    }
  }

  default() {
    pathUtils.updateDestinationOption(this, generatorName);
  }

  writing() {
    const name = this.options.name;
    const upperCamelCaseName = utils.fromLispToUpperCamelCase(name);

    let destination = this.options.destination;
    if (!this.options.flat) {
      destination = path.join(destination, name);
    }
    this.fs.copyTpl(
      this.templatePath('template.component.tsx'),
      path.join(destination, `${name}.component.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copyTpl(
      this.templatePath('template.component.spec.tsx'),
      path.join(destination, `${name}.component.spec.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copy(
      this.templatePath('template.component.scss'),
      path.join(destination, `${name}.component.scss`)
    );
  }
};
