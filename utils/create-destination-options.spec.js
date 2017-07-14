const {createDestinationOptions} = require('./create-destination-options');

describe('CreateDestinationOptions', () => {
  it('should create options', () => {
    const name = 'test-name';
    const options = createDestinationOptions(name);
    expect(options).toBeDefined();
  });
});
