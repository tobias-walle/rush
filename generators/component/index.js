'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const utils = require('../../utils/general-utils');
const pathUtils = require('../../utils/path-utils');

const generatorName = 'component';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

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
  }

  default() {
    pathUtils.updateDestinationOption(this);
  }

  writing() {
    const name = this.options.name;
    console.log(this.options);
    console.log('Name', name);
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
