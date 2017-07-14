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
}

module.exports = {
  GeneratorOptionCollection
};
