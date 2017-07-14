const pathUtils = require('./../utils/path-utils');

function SubGenerator(ClassReference, generatorName, options) {
  return class extends ClassReference {
    constructor(...args) {
      super(...args);
      options.applyOptions(this, generatorName);
    }

    default() {
      options.validate(this, generatorName);
      pathUtils.updateDestinationOption(this, generatorName);
      super.default.apply(this);
    }
  }
}

module.exports = SubGenerator;
