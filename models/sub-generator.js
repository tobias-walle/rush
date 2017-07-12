const Generator = require('yeoman-generator');

class SubGenerator extends Generator {
  constructor(args, opts, generatorName) {
    super(args, opts);
    this.subGeneratorSettings = {
      generatorName
    };
  }

  default() {

  }
}