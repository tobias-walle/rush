const {
  loadDefaultConfiguration,
  createInitialDefaultConfiguration
} = require('./yo-rc-utils');

describe('YoRcUtils', () => {
  it('should create initial configuration', () => {
    jest.mock('../configuration', () => ({
      test1: {},
      test2: {}
    }));
    expect(createInitialDefaultConfiguration()).toEqual({
      test1: {},
      test2: {}
    });
  });

  it('should load the default configuration', () => {
    const defaultConfiguration = {
      property: 123
    };
    const generatorName = 'test';
    const configuration = {
      defaults: {
        [generatorName]: defaultConfiguration
      }
    };
    expect(loadDefaultConfiguration(configuration, generatorName)).toEqual(defaultConfiguration);
  });
});
