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
  createDestinationOptions
} = require('../utils/create-destination-options');

describe('SubGeneratorDecorator', () => {
  it('should work', async() => {
    expect.assertions(2);
    const optionNames = ['test1', 'test2'];
    const values = [123, 456];
    debugger;
    const options = createDestinationOptions('test', new GeneratorOptionCollection([
      new GeneratorOption(optionNames[0], {
        'type': 'argument',
        'cliOptions': {
          'default': values[0],
          'required': false,
        }
      }),
      new GeneratorOption(optionNames[1], {
        'cliOptions': {
          'default': values[1],
          'required': false,
        }
      }),
    ]));
    console.log('O', options);
    const generatorName = 'test';
    class TestGenerator extends Generator {
      writing() {
        console.log('Write');
        const optionKeys = Object.keys(this.options);
        console.log(optionKeys);
        for (let name of optionNames) {
          console.log('name', name);
          expect(optionKeys.includes(name)).toBeTruthy();
        }
      }
    }

    console.log(1);
    const WrappedClass = SubGenerator(TestGenerator, 'test', options)
    console.log(2);
    await helpers.run(WrappedClass)
      .withOptions({
        destination: '.',
        abc: 'tetstesfa'
      })
      .withArguments(['test-name'])
    ;
  });
});
