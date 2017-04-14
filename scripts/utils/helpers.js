module.exports = {

  /**
   * Transform a string into a capitalized string.
   */
  capitalizeString(s) {
    let result = '';
    let words = s.split(/[_-]/);

    for (let w of words) {
      if (w.length > 0 && w[w.length - 1] !== ' ') {
        result += ' ';
      }
      if (s.length > 0) {
        result += s[0].toUpperCase() + s.slice(1).toLowerCase();
      } else {
        result += s;
      }
    }

    return result;
  },

  /**
   * Convert a string to camel case.
   */
  camelCaseString(s) {
    let words = s.split(/[_-]/);
    return words.map((w, i) => {
      if (w.length === 0) {
        return w;
      }
      if (i === 0) {
        return w.toLowerCase();
      }
      return w[0].toUpperCase() + w.slice(1).toLowerCase();

    }).join('');
  },

  /**
   * Convert a camel case string into lisp case.
   */
  fromCamelCaseToLispCase(s) {
    let result = '';
    for (let c of s) {
      if (c === c.toUpperCase()) {
        result += `-${c.toLowerCase()}`;
      } else {
        result += c;
      }
    }
    return result;
  },

  onProcessClosed(process, callback) {
    process.on('exit', callback);
    process.on('SIGINT', callback);
    process.on('SIGTERM', callback);
    process.on('uncaughtException', callback);
  }
};
