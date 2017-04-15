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
      desc: 'If True, there will be no folder created for this component',
      default: false
    });

    this.option('stateless', {
      alias: 's',
      type: Boolean,
      desc: 'Should the component be a stateless component? This also means, there will be no style file generated' +
      'for this component.',
      default: false
    });
  }

  default() {
    pathUtils.updateDestinationOption(this, generatorName);
  }

  writing() {
    const {name, stateless} = this.options;
    const upperCamelCaseName = utils.fromLispToUpperCamelCase(name);

    let destination = this.options.destination;
    if (!this.options.flat) {
      destination = path.join(destination, name);
    }
    const componentTemplateName = stateless ? 'template.component-stateless.tsx' : 'template.component.tsx';
    this.fs.copyTpl(
      this.templatePath(componentTemplateName),
      path.join(destination, `${name}.component.tsx`),
      {name, upperCamelCaseName}
    );
    this.fs.copyTpl(
      this.templatePath('template.component.spec.tsx'),
      path.join(destination, `${name}.component.spec.tsx`),
      {name, upperCamelCaseName}
    );
    if (!stateless) {
      // Stateless components don't have styles
      this.fs.copy(
        this.templatePath('template.component.scss'),
        path.join(destination, `${name}.component.scss`)
      );
    }
  }
};
