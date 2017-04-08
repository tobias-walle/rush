'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');
const validate = require('../../utils/validate-utils');
const utils = require('../../utils/general-utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: true,
      desc: 'The name of the component'
    });

    this.option('destination', {
      alias: 'd',
      type: String,
      desc: 'The destination folder of the component'
    });

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

  writing() {
    const name = this.options.name;
    const upperCamelCaseName = utils.fromLispToUpperCamelCase(name);

    let destination = this.options.destination || this.contextRoot;
    if (!this.options.flat) {
      destination = path.join(destination, name);
      mkdirp(name);
    }
    this.fs.copyTpl(
      this.templatePath('template.component.tsx'),
      this.destinationPath(destination, `${name}.component.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copyTpl(
      this.templatePath('template.component.spec.tsx'),
      this.destinationPath(destination, `${name}.component.spec.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copy(
      this.templatePath('template.component.scss'),
      this.destinationPath(destination, `${name}.component.scss`)
    );
  }
};
