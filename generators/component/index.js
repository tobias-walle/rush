'use strict';
const Generator = require('yeoman-generator');
const validate = require('../../utils/validate-utils');
const utils = require('../../utils/general-utils');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: true,
      desc: 'The name of the component.'
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
    const name = this.options.name;
    this.destinationRoot(this.contextRoot);
    mkdirp(name);
  }

  writing() {
    const name = this.options.name;
    const upperCamelCaseName = utils.fromLispToUpperCamelCase(name);

    this.fs.copyTpl(
      this.templatePath('template.component.tsx'),
      this.destinationPath(name, `${name}.component.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copyTpl(
      this.templatePath('template.component.spec.tsx'),
      this.destinationPath(name, `${name}.component.spec.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copy(
      this.templatePath('template.component.scss'),
      this.destinationPath(name, `${name}.component.scss`)
    );
  }
};
