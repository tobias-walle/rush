'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const utils = require('../../utils/general-utils');
const pathUtils = require('../../utils/path-utils');
const validate = require('../../utils/validate-utils');

const generatorName = 'container';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    pathUtils.setupDestinationOptions(this, generatorName);

    this.option('componentName', {
      type: String,
      desc: `The name of the component this container extends. If not set, this will be the same as the container name`
    });
  }

  default() {
    const componentName = this.options.componentName || this.options.name;
    if (!validate.validateName(componentName)) {
      this.env.error('Only lower case characters and hyphens are allowed in the component name');
    }
    this.options.componentName = componentName || this.options.name;
    pathUtils.updateDestinationOption(this);
  }

  writing() {
    const {name, componentName} = this.options;
    const upperCamelCaseName = utils.fromLispToUpperCamelCase(name);
    const componentImportPath = `../components/${componentName}/${componentName}.component.tsx`;
    const upperCamelCaseNameComponent = utils.fromLispToUpperCamelCase(componentName);

    let destination = this.options.destination;
    this.fs.copyTpl(
      this.templatePath('template.container.ts'),
      path.join(destination, `${name}.container.ts`),
      {name, upperCamelCaseName, upperCamelCaseNameComponent, componentImportPath}
    );
  }
};
