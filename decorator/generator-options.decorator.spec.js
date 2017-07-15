const decorateGeneratorOptions = require('./generator-options.decorator');
const Generator = require('yeoman-generator');
const {
  GeneratorOptionCollection
} = require('../models/generator-option-collection');
const {
  GeneratorOption
} = require('../models/generator-option');
const helpers = require('yeoman-test');

describe('GeneratorOptionsDecorator', () => {
  it('should work', async () => {
    expect.assertions(2);
    const optionNames = ['test1', 'test2'];
    const values = ['123', '456'];
    const options = new GeneratorOptionCollection([
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
    ]);
    class TestGenerator extends Generator {
      writing() {
        const optionKeys = Object.keys(this.options);
        for (let name of optionNames) {
          expect(optionKeys.includes(name)).toBeTruthy();
        }
      }
    }

    TestGenerator = decorateGeneratorOptions(TestGenerator, 'test', options)
    await helpers.run(TestGenerator);
  });

  it('should load defaults', async () => {
    expect.assertions(2);
    jest.mock('../utils/yo-rc-utils', () => ({
      loadDefaultConfiguration: () => (
        {
          test1: '123',
          test2: '456'
        }
      )
    }));
    const optionNames = ['test1', 'test2'];
    const defaults = ['123', '456'];
    const options = new GeneratorOptionCollection([
      new GeneratorOption(optionNames[0], {
        type: 'argument',
        cliOptions: {
          type: String,
          required: false
        }
      }),
      new GeneratorOption(optionNames[1], {
        cliOptions: {
          type: String,
          required: false
        }
      }),
    ]);
    class TestGenerator extends Generator {
      writing() {
        optionNames.forEach((key, i) => {
          expect(this.options[key]).toBe(defaults[i]);
        })
      }
    };

    TestGenerator = decorateGeneratorOptions(TestGenerator, 'test', options)
    await helpers.run(TestGenerator);
  });

  it('shouldn\'t load defaults if defined', async () => {
    expect.assertions(2);
    jest.mock('../utils/yo-rc-utils', () => ({
      loadDefaultConfiguration: () => (
        {
          test1: '123',
          test2: '456'
        }
      )
    }));
    const optionNames = ['test1', 'test2'];
    const values = ['abc', 'def'];
    const options = new GeneratorOptionCollection([
      new GeneratorOption(optionNames[0], {
        type: 'argument',
        cliOptions: {
          type: String,
          required: false
        }
      }),
      new GeneratorOption(optionNames[1], {
        cliOptions: {
          type: String,
          required: false
        }
      }),
    ]);
    class TestGenerator extends Generator {
      writing() {
        optionNames.forEach((key, i) => {
          expect(this.options[key]).toBe(values[i]);
        })
      }
    };

    TestGenerator = decorateGeneratorOptions(TestGenerator, 'test', options)
    await helpers.run(TestGenerator)
      .withArguments([values[0]])
      .withOptions({
        test2: values[1]
      })
    ;
  });
});