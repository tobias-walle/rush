class GeneratorOptionCollection {

  constructor(options) {
    this.options = options;
  }

  applyOptions(generatorInstance, generatorName) {
    for (let option of this.options) {
      option.applyOptions(generatorInstance, generatorName);
    }
  }

  mergeWith(otherCollection) {
    this.options = [
      ...this.options,
      ...otherCollection.options
    ];
  }

  validate(generatorInstance, generatorName) {
    for (let option of this.options) {
      option.validate(generatorInstance, generatorName);
    }
  }

  get(name) {
    return this.options.find(option => option.name === name);
  }
}

module.exports = {
  GeneratorOptionCollection
};
