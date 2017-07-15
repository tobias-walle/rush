'use strict';
const Generator = require('yeoman-generator');
const ejs = require('ejs');
const path = require('path');
const utils = require('../../utils/general-utils');

function getActionCreatorName(element, duckName) {
  const name = [duckName, element].join('-');
  return `${utils.fromLispToCamelCase(name)}Duck`;
}

const DuckGenerator = class extends Generator {
  default() {
    const elements = this.options.elements;
    this.options.elements = elements === '' ? [] : elements.split(' ');
  }

  writing() {
    const destination = this.options.destination;
    const elements = this.options.elements;
    const name = this.options.name;

    const duckTemplate = this.fs.read(this.templatePath('duck.ts'));
    const stateClass = `${utils.fromLispToUpperCamelCase(name)}State`;
    const reducer = `${utils.fromLispToCamelCase(name)}Reducer`;
    const epic = `$${utils.fromLispToCamelCase(name)}Epic`;
    const ducks = elements.map(element => {
      const action = `app/${name}/${utils.fromLispToUpperCase(element)}`;
      const actionCreator = getActionCreatorName(element, name);
      return ejs.render(duckTemplate, {
        action,
        actionCreator,
        stateClass
      });
    });
    const actionCreators = elements.map(element => getActionCreatorName(element, name));
    const duckName = `${utils.fromLispToCamelCase(name)}Duck`;

    this.fs.copyTpl(
      this.templatePath('name.duck.ts'),
      path.join(destination, `${name}.duck.ts`),
      {
        stateClass, reducer, epic, actionCreators, ducks
      }
    );
    this.fs.copyTpl(
      this.templatePath('name.duck.spec.ts'),
      path.join(destination, `${name}.duck.spec.ts`),
      {
        duckName
      }
    );
  }

};

const decorateSubGenerator = require('../../decorator/sub-generator.decorator');
const options = require('../../configuration/duck-options');
const generatorName = 'duck';
module.exports = decorateSubGenerator(DuckGenerator, generatorName, options);
