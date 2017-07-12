const { GeneratorOptionCollection } = require('./generator-option-collection');

describe('GeneratorOptionsCollection', () => {
  describe('applyOptions', () => {
    it('should work', () => {
      expect.assertions(6);
      const generatorInstance = 1;
      const generatorName = 2;
      const generatorOption = {
        applyOptions: (instance, name) => {
          expect(instance).toBe(generatorInstance);
          expect(name).toBe(generatorName);
        }
      };
      const generatorOptionCollection = new GeneratorOptionCollection([
        generatorOption,
        generatorOption,
        generatorOption,
      ]);
      generatorOptionCollection.applyOptions(generatorInstance, generatorName);
    });
  });
});