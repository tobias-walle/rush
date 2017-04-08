'use strict';
const Generator = require('yeoman-generator');
const ejs = require('ejs');
const path = require('path');
const utils = require('../../utils/general-utils');
const validate = require('../../utils/validate-utils');
const moduleUtils = require('../../utils/module-utils');

function validateElements(elements) {
  if (!validate.isLispCase(elements, {withSpaces: true})) {
    return 'Only lowercase characters, hyphens and spaces are allowed.';
  }
  return true;
}

function getActionCreatorName(element, duckName) {
  const name = [duckName, element].join('-');
  return `${utils.fromLispToCamelCase(name)}Duck`;
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: true,
      desc: 'The name of the duck module'
    });

    this.argument('elements', {
      type: String,
      desc: 'What actions should the duck have (lowercase, separated by a space)? ' +
      'For example "get get-all delete" will create the actions "app/<module>/GET", ' +
      '"app/<module>/GET_ALL" and "app/<module>/DELETE" and the associated action creators and' +
      ' reducers.',
      default: ''
    });

    this.option('moduleName', {
      alias: 'm',
      type: String,
      desc: 'The name of the module'
    });

    this.option('destination', {
      alias: 'd',
      type: String,
      desc: 'The destination folder of the duck',
      default: this.contextRoot
    });
  }

  initializing() {
    if (!this.options.moduleName) {
      const moduleName = moduleUtils.findModuleName(this.contextRoot, 'src/app/modules');

      if (!moduleName) {
        this.env.error('Couldn\'t find module name. Please make sure you are in a module folder.');
      }
      this.options.moduleName = moduleName;
    }
  }

  default() {
    this.destinationRoot(this.contextRoot);
    const elements = this.options.elements;

    const error = validateElements(elements);
    if (error !== true) {
      this.env.error(error);
    }

    if (elements === '') {
      this.options.elements = [];
    } else {
      this.options.elements = elements.split(' ');
    }
  }

  writing() {
    const destination = this.options.destination;
    const elements = this.options.elements;
    const moduleName = this.options.moduleName;
    const name = this.options.name;

    const duckTemplate = this.fs.read(this.templatePath('duck.ts'));
    const stateClass = `${utils.fromLispToUpperCamelCase(name)}State`;
    const reducer = `${utils.fromLispToCamelCase(name)}Reducer`;
    const epic = `$${utils.fromLispToCamelCase(name)}Epic`;
    const ducks = elements.map(element => {
      const action = `app/${moduleName}/${utils.fromLispToUpperCase(element)}`;
      const actionCreator = getActionCreatorName(element, name);
      return ejs.render(duckTemplate, {
        action,
        actionCreator,
        stateClass
      });
    });
    const actionCreators = elements.map(element => getActionCreatorName(element, name));

    this.fs.copyTpl(
      this.templatePath('name.duck.ts'),
      path.join(destination, `${name}.duck.ts`),
      {
        stateClass, reducer, epic, actionCreators, ducks
      }
    );
  }

};
