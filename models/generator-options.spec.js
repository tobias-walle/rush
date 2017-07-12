'use strict';
const {
  GeneratorOption
} = require('./generator-option');

describe('GeneratorOption', () => {
  let defaultName;
  let defaultOptions;
  let generatorName;
  let generatorOption;

  beforeEach(() => {
    defaultName = 'name';
    defaultOptions = {
      cliOptions: {
        alias: 'a',
        type: String,
        desc: 'This is a description',
        default: false
      },
    }
    generatorName = 'testGenerator';
    generatorOption = new GeneratorOption(defaultName, defaultOptions);
  });

  it('should construct an instance', () => {
    expect(generatorOption).toBeDefined();
    expect(generatorOption.name).toBe(defaultName);
    expect(generatorOption.options).toEqual(defaultOptions);
  });

  describe('applyOptions', () => {
    it('should work with default options', (done) => {
      expect.assertions(2);
      const generatorMock = {
        option: (name, options) => {
          expect(name).toBe(defaultName);
          expect(options).toEqual(defaultOptions.cliOptions);
          done();
        }
      }
      generatorOption.applyOptions(generatorMock, generatorName);
    });

    it('should work with function options', (done) => {
      expect.assertions(2);
      const cliOptions = defaultOptions.cliOptions;
      // Set function as cli options
      cliOptions.alias = (name, generatorInstance) => name;
      // .type is not supported
      cliOptions.desc = (name, generatorInstance) => `Description: ${name}`;
      cliOptions.default = (name, generatorInstance) => !!generatorInstance;

      const expectedCliOptions = Object.assign({}, cliOptions, {
        alias: generatorName,
        desc: `Description: ${generatorName}`,
        default: true
      });
      const generatorMock = {
        option: (name, options) => {
          expect(name).toBe(defaultName);
          expect(options).toEqual(expectedCliOptions);
          done();
        }
      }
      generatorOption.applyOptions(generatorMock, generatorName);
    });

    it('should work with arguments', (done) => {
      expect.assertions(2);
      generatorOption.options.type = 'argument';
      const generatorMock = {
        argument: (name, options) => {
          expect(name).toBe(defaultName);
          expect(options).toEqual(defaultOptions.cliOptions);
          done();
        }
      }
      generatorOption.applyOptions(generatorMock, generatorName);
    });


  });

  describe('validate', () => {
    let mockGenerator;
    const ERROR_MESSAGE = 'testError';

    beforeEach(() => {
      mockGenerator = {
        env: {
          error: null
        },
        options: {}
      }

      defaultOptions.validate = (value, generatorName) => {
        if (value !== 'test') {
          return ERROR_MESSAGE;
        }
      }
    });

    it('should work on fail', (done) => {
      expect.assertions(1);
      mockGenerator.env.error = (message) => {
        expect(message).toEqual(ERROR_MESSAGE);
        done();
      }
      mockGenerator.options[defaultName] = '123';
      generatorOption.validate(mockGenerator, generatorName);
    });

    it('should work on success', () => {
      mockGenerator.env.error = (message) => {
        fail();
      }
      mockGenerator.options[defaultName] = 'test';
      generatorOption.validate(mockGenerator, generatorName);
    })
  });
});
