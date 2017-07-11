'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const validate = require('../../utils/validate-utils');
const utils = require('../../utils/general-utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('upgrade', {
      type: Boolean,
      desc: 'If true, the generator tries to find an existing generator configuration ' +
      'and just regenerates the project. Set this flag if you want to ' +
      'update an existing project. You have to be in the project folder so yeoman can ' +
      'find the configuration.'
    });
  }

  prompting() {
    // Greet user
    this.log(chalk.bold('  Welcome to the ') + chalk.bold(chalk.blue('rush') + ' generator! \n'));

    // Setup the available prompts
    const promptSettings = {
      name: {
        type: 'input',
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
      description: {
        type: 'input',
        message: 'Description?'
      },
      author: {
        type: 'input',
        message: 'Author?'
      },
      homepage: {
        type: 'input',
        message: 'Homepage?'
      },
      keywords: {
        type: 'input',
        message: 'Keywords (separated by comma)?'
      },
      license: {
        type: 'input',
        message: 'License?',
        default: 'MIT'
      }
    };
    // The default order of the prompts
    const promptOrder = ['name', 'description', 'author', 'homepage', 'keywords', 'license'];

    // Figure out which prompts to show
    this.props = {};
    let promptsToShow = [];
    const generatorConfig = this.config.get('appGeneratorSettings');
    if (this.options.upgrade && generatorConfig) {
      // If the upgrade option is enabled, try to find an existing config
      for (let promptKey of promptOrder) {
        if (generatorConfig[promptKey] === undefined) {
          promptsToShow.push(promptKey);
        } else {
          this.props[promptKey] = generatorConfig[promptKey];
        }
      }
      console.log(this.props);
    } else {
      // Other just show all prompts
      promptsToShow = promptOrder;
    }
    // Get the prompts and set the name property
    const prompts = promptsToShow.map(key => {
      const prompt = promptSettings[key];
      if (prompt === undefined) {
        this.env.error(`Couldn't find prompt with the key "${key}"`);
      }
      prompt.name = key;
      return prompt;
    });

    // Show prompts
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = Object.assign(this.props, props);
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      const projectFolder = this.destinationPath(this.props.name);
      if (fs.existsSync(projectFolder)) {
        this.log(
          `Use "${this.props.name}" as the project folder.`
        );
      } else {
        this.log(
          `Create the project folder "${this.props.name}".`
        );
        mkdirp(this.props.name);
      }
      this.destinationRoot(projectFolder);
    }
  }

  writing() {
    // Copy files
    this.fs.copy(
      this.templatePath('rush/**/*'),
      this.destinationPath(),
      {
        globOptions: {
          dot: true,
          ignore: [
            '**/.git',
            '**/media/**/*'
          ]
        }
      }
    );

    // Update package.json
    const pkgPath = this.destinationPath('package.json');
    let pkg = this.fs.readJSON(pkgPath);
    const {name, description, author, license, homepage, keywords} = this.props;
    let keywordsArray = (keywords === '' || keywords === undefined) ? [] : keywords.split(',');
    pkg = Object.assign(pkg, {
      name,
      description,
      author,
      license,
      homepage,
      keywords: keywordsArray
    });
    this.fs.writeJSON(pkgPath, pkg);

    // Write README
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: utils.fromLispToFirstLetterUppercaseWords(name),
        description, author, license
      }
    );

    // Yoeman Config
    this.config.set({
      modulesPath: 'src/app/modules',
      appGeneratorSettings: this.props,
      componentsBasePath: 'components',
      containersBasePath: 'container',
      ducksBasePath: ''
    });
  }

  install() {
    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false
    });
  }
};
