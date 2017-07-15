class GeneratorOption {
  constructor(name, options) {
    this.name = name;
    this.options = options;
  }

  applyOptions(generatorInstance, generatorName) {
    const cliOptions = {};
    for (let key in this.options.cliOptions) {
      if (!Object.prototype.hasOwnProperty.call(this.options.cliOptions, key)) {
        return;
      }
      let property = this.options.cliOptions[key];
      if (property instanceof Function && key !== 'type') {
        // Functions will be resolved this the generatorInstance and name
        property = property(generatorName, generatorInstance);
      }
      cliOptions[key] = property;
    }

    if (this.options.type === 'argument') {
      generatorInstance.argument(this.name, cliOptions);
    } else {
      generatorInstance.option(this.name, cliOptions);
    }
  }

  validate(generatorInstance, generatorName) {
    const validate = this.options.validate;
    if (!validate) {
      return;
    }

    const value = generatorInstance.options[this.name];
    const errorMessage = validate(value, generatorName);
    if (errorMessage) {
      generatorInstance.env.error(errorMessage);
    }
  }

  setDefault(value) {
    if (this.options && this.options.cliOptions) {
      this.options.cliOptions.default = value;
    }
  }
}

module.exports = {
  GeneratorOption
};
