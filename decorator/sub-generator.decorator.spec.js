const SubGenerator = require('./sub-generator.decorator');
const Generator = require('yeoman-generator');
const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const {
  GeneratorOption
} = require('../models/generator-option');
const helpers = require('yeoman-test');
const {
  buildSubGeneratorOptions
} = require('../utils/build-sub-generator-options');

describe('SubGeneratorDecorator', () => {
  it('should work', async() => {
    expect.assertions(3);
    const optionNames = ['test1', 'test2'];
    const values = ['123', '456'];
    const options = buildSubGeneratorOptions('test', new GeneratorOptionCollection([
      new GeneratorOption(optionNames[0], {
        type: 'argument',
        cliOptions: {
          type: String,
          default: values[0],
        }
      }),
      new GeneratorOption(optionNames[1], {
        cliOptions: {
          type: String,
          default: values[1],
        }
      }),
    ]));
    class TestGenerator extends Generator {
      writing() {
        const optionKeys = Object.keys(this.options);
        for (let name of optionNames) {
          expect(optionKeys.includes(name)).toBeTruthy();
        }
      }

      default() {
        expect(this.options).toBeDefined();
      }
    }

    TestGenerator = SubGenerator(TestGenerator, 'test', options);
    await helpers.run(TestGenerator)
      .withOptions({
        destination: '.',
      })
      .withArguments(['test-name'])
    ;
  });
});
