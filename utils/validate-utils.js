module.exports = {
  isLispCase: string => {
    return /^[a-z0-9-]*$/.test(string);
  },
  isEmpty: string => {
    return string === '';
  }
};
