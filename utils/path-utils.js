const moduleUtils = require('./module-utils');
const path = require('path');

/**
 * Setup the prompts which are required for the destination.
 * @param generatorInstance The instance of the generator.
 * @param generatorName The name of the generator.
 */
function setupDestinationOptions(generatorInstance, generatorName) {
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
}

/**
 * Update the destination option relative to the selected module.
 * @param generatorInstance The instance of the generator.
 * @param generatorName The name of the generator.
 */
function updateDestinationOption(generatorInstance, generatorName) {
  const options = generatorInstance.options;
  let destination = options.destination;
  try {
    if (!destination) {
      destination = generatorInstance.destinationPath(
        moduleUtils.getRelativeDestination(
          generatorInstance.contextRoot,
          options.module,
          moduleUtils.getModulesPath(generatorInstance.config)
        ));
      if (options.module !== options.name) {
        destination = path.join(destination, `${generatorName}s`);
      }
    }
  } catch (e) {
    generatorInstance.env.error(e);
  }
  options.destination = destination;
}

module.exports = {
  setupDestinationOptions,
  updateDestinationOption
};

