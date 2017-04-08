'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const mkdirp = require('mkdirp');
const validate = require('../../utils/validate-utils');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log('Welcome to the ' + chalk.blue('react-base') + ' generator!');

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        validate: name => {
          if (validate.isEmpty(name)) {
            return 'The project name has to be set';
          } else if (!validate.isLispCase(name)) {
            return 'Only lower case letters, digits and hyphens are allowed in the project name. For Example: my-project';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description?'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author?'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage?'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords (separated by comma)?'
      },
      {
        type: 'input',
        name: 'license',
        message: 'License?',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Create the project folder "${this.props.name}"`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationRoot(this.props.name));
    }
  }

  writing() {
    this.config.save();

    // Copy files
    this.fs.copy(
      this.templatePath('typed-react-base/**/*'),
      this.destinationPath(),
      {
        globOptions: {
          dot: true,
          ignore: [
            '**/.git'
          ]
        }
      }
    );

    // Update package.json
    const pkgPath = this.destinationPath('package.json');
    let pkg = this.fs.readJSON(pkgPath);
    const {name, description, author, license, homepage, keywords} = this.props;
    let keywordsArray = keywords === '' ? [] : keywords.split(',');
    pkg = Object.assign(pkg, {
      name,
      description,
      author,
      license,
      homepage,
      keywords: keywordsArray
    });
    this.fs.writeJSON(pkgPath, pkg);
  }

  install() {
    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false
    });
  }
};
