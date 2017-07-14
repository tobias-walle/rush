const pathUtils = require('./../utils/path-utils');

function SubGenerator(ClassReference, generatorName, options) {
  return class extends ClassReference {
    constructor(...args) {
      super(...args);
      console.log('KEYS', Object.keys(args[1]));
      options.applyOptions(this, generatorName);
    }

    default() {
      options.validate(this, generatorName);
      pathUtils.updateDestinationOption(this, generatorName);

      super.default && super.default();
    }
  }
}

module.exports = SubGenerator;
