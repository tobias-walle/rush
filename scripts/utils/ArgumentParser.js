const helpers = require('./helpers');


/**
 * Generates and logs the documentation of an cli interface.
 */
const printCliDocumentation = (command, arguments, options) => {
  let output = `${command} ${Object.keys(arguments).map(s => `[${s}]`).join(' ')} [OPTIONS]`;
  output += '\n\nArguments:';
  for (let key in arguments) {
    if (arguments.hasOwnProperty(key)) {
      output += `\n\t${key}: ${arguments[key].join(' | ')}`;
    }
  }
  output += '\n';
  output += '\nOptions:';
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      let possibleOptions = options[key].options;
      output += `\n\t--${helpers.fromCamelCaseToLispCase(key)}: `;
      if (possibleOptions) {
        output += `${possibleOptions.join(' | ')} - `
      }
      output += `${options[key].description}`;
    }
  }
  console.log(output);
};

/**
 * Parses the commandline arguments and returns them.
 */
module.exports = (ARGUMENT_CONFIG, OPTION_CONFIG) => {
  let argv = require('minimist')(process.argv.slice(2));

  // Parse Arguments
  let arguments = {};
  if (argv._.length !== Object.keys(ARGUMENT_CONFIG).length) {
    // Print help
    printCliDocumentation('build', ARGUMENT_CONFIG, OPTION_CONFIG);
    process.exit(0);
  }
  else {
    // Validate Arguments
    for (let i = 0; i < argv._.length; i++) {
      let key = Object.keys(ARGUMENT_CONFIG)[i];
      let possibleValues = ARGUMENT_CONFIG[key];
      if (possibleValues.indexOf(argv._[i]) === -1) {
        console.error(`${helpers.capitalizeString(key)} '${argv._[i]}' does not exists. ` +
          `Possible values are [${possibleValues.map(s => `'${s}'`).join(', ')}]`);
        process.exit(0);
      }
      arguments[key.toLowerCase()] = argv._[i];
      i++;
    }


    // Parse Options
    let options = {};
    for (let key in argv) {
      if (argv.hasOwnProperty(key) !== undefined && key !== '_') {
        // Check if option exists
        let keyCamelCase = helpers.camelCaseString(key);
        if (Object.keys(OPTION_CONFIG).indexOf(keyCamelCase) !== -1) {
          let option = argv[key];
          let possibleOptions = OPTION_CONFIG[keyCamelCase].options;
          if (possibleOptions && possibleOptions.indexOf(option) === -1) {
            console.error(`Option '${key}' cannot have the value '${option}'. ` +
              `Possible values are ${OPTION_CONFIG[key].options.map(s => `'${s}'`).join(', ')}`);
            process.exit(0);
          }
          options[keyCamelCase] = option;
        } else {
          console.error(`Option '${key}' not found.`);
          process.exit(0);
        }
      }
    }

    // Return combined
    return Object.assign(arguments, options);
  }
};



