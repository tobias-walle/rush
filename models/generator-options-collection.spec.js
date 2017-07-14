const {
  GeneratorOptionCollection
} = require('./generator-option-collection');

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
        generatorOption
      ]);
      generatorOptionCollection.applyOptions(generatorInstance, generatorName);
    });
  });

  describe('mergeWith', () => {
    it('should work', () => {
      const collection1 = new GeneratorOptionCollection([{
        test: 1
      }]);
      const collection2 = new GeneratorOptionCollection([{
        test: 2
      }]);
      collection1.mergeWith(collection2);
      expect(collection1.options).toEqual([{
          test: 1
        },
        {
          test: 2
        }
      ]);
    });
  });

  describe('validate', () => {
    it('should be called', () => {
      expect.assertions(2);
      const collection = new GeneratorOptionCollection([
        {
          validate: () => expect(true).toBe(true)
        },
        {
          validate: () => expect(true).toBe(true)
        }
      ]);
      collection.validate();
    });
  });
});
