module.exports = {
  isLispCase: (string, options) => {
    options = options || {};
    let pattern;
    if (options.withSpaces) {
      pattern = /^[a-z0-9- ]*$/;
    } else {
      pattern = /^[a-z0-9-]*$/;
    }
    return pattern.test(string);
  },
  isEmpty: string => {
    return string === '';
  }
};
