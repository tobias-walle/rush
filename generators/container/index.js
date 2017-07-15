'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const utils = require('../../utils/general-utils');
const moduleUtils = require('../../utils/module-utils');

class ContainerGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  default() {
    const componentName = this.options.componentName || this.options.name;
    this.options.componentName = componentName || this.options.name;
    console.log('NAME', componentName);
  }

  writing() {
    const {name, componentName} = this.options;
    const destination = this.options.destination;
    let moduleName = this.options.module;
    if (!moduleName) {
      moduleName = moduleUtils.findModuleName(destination, moduleUtils.getModulesPath(this.config));
    }
    const upperCamelCaseName = utils.fromLispToUpperCamelCase(name);
    const componentImportPath = `@modules/${moduleName}/components/${componentName}/${componentName}.component`;
    const upperCamelCaseNameComponent = utils.fromLispToUpperCamelCase(componentName);

    this.fs.copyTpl(
      this.templatePath('template.container.ts'),
      path.join(destination, `${name}.container.ts`),
      {name, upperCamelCaseName, upperCamelCaseNameComponent, componentImportPath}
    );
  }
};

const decorateSubGenerator = require('../../decorator/sub-generator.decorator');
const options = require('../../configuration/container-options');
const generatorName = 'container';
module.exports = decorateSubGenerator(ContainerGenerator, generatorName, options);
