function isLispCase(inputString, options = {}) {
  options = options || {};
  let pattern;
  if (options.withSpaces) {
    pattern = /^[a-z0-9- ]*$/;
  } else {
    pattern = /^[a-z0-9-]*$/;
  }
  return pattern.test(inputString);
}

function validateName(inputString) {
  if (inputString === '' || inputString === undefined) {
    return false;
  }
  const pathFragments = inputString.split('/');
  const name = pathFragments[pathFragments.length - 1];
  return isLispCase(name);
}

function isEmpty(inputString) {
  return inputString === '';
}

module.exports = {
  isLispCase,
  validateName,
  isEmpty
};
