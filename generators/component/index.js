'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const utils = require('../../utils/general-utils');
const pathUtils = require('../../utils/path-utils');

class ComponentGenerator extends Generator {
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

const decorateSubGenerator = require('../../decorator/sub-generator.decorator');
const options = require('../../configuration/component-options');
const componentName = 'component';
module.exports = decorateSubGenerator(ComponentGenerator, componentName, options);
