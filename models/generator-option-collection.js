const GeneratorOption = require('./generator-option').GeneratorOption;

class GeneratorOptionCollection {

  constructor(options) {
    this.options = options;
  }

  applyOptions(generatorInstance, generatorName) {
    for (let option of this.options) {
      option.applyOptions(generatorInstance, generatorName);
    }
  }
}

module.exports = {
  GeneratorOptionCollection
}