const moduleUtils = require('./module-utils');
const validate = require('./validate-utils');
const path = require('path');

/**
 * Setup the prompts which are required for the destination.
 * @param generatorInstance The instance of the generator.
 * @param generatorName The name of the generator.
 */
function setupDestinationOptions(generatorInstance, generatorName) {
  const options = generatorInstance.options;

  generatorInstance.argument('name', {
    type: String,
    required: true,
    desc: `The name of the ${generatorName}`
  });

  generatorInstance.option('module', {
    alias: 'm',
    type: String,
    desc: `The destination module of the ${generatorName}`
  });

  generatorInstance.option('destination', {
    alias: 'd',
    type: String,
    desc: `The destination folder of the ${generatorName}`
  });

  if (!validate.validateName(options.name)) {
    this.env.error(`Only lower case characters and hyphens are allowed in the ${generatorName} name`);
  }
}

/**
 * Update the destination option relative to the selected module.
 * @param generatorInstance The instance of the generator.
 */
function updateDestinationOption(generatorInstance) {
  const options = generatorInstance.options;
  // Split name from path
  const pathFragments = options.name.split('/');
  options.name = pathFragments.splice(pathFragments.length - 1, 1)[0];
  options.namePath = pathFragments.length ? pathFragments.join('/') : '';
  generatorInstance.options = options;

  let destination = options.destination;
  try {
    if (!destination) {
      destination = generatorInstance.destinationPath(
        moduleUtils.getRelativeDestination(
          generatorInstance.contextRoot,
          options.module,
          moduleUtils.getModulesPath(generatorInstance.config)
        ));
    }
    destination = path.join(destination, generatorInstance.options.namePath);
  } catch (e) {
    generatorInstance.env.error(e);
  }
  options.destination = destination;
}

module.exports = {
  setupDestinationOptions,
  updateDestinationOption
};

