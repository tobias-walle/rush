'use strict';
const Generator = require('yeoman-generator');
const ejs = require('ejs');
const path = require('path');
const utils = require('../../utils/general-utils');
const validate = require('../../utils/validate-utils');
const pathUtils = require('../../utils/path-utils');

const generatorName = 'duck';

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

    pathUtils.setupDestinationOptions(this, generatorName);
  }

  default() {
    // Elements
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

    // Destination Path
    pathUtils.updateDestinationOption(this, generatorName);
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

    this.fs.copyTpl(
      this.templatePath('name.duck.ts'),
      path.join(destination, `${name}.duck.ts`),
      {
        stateClass, reducer, epic, actionCreators, ducks
      }
    );
  }

};
