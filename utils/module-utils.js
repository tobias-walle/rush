const escapeStringRegExp = require('escape-string-regexp');

function findModuleName(contextRoot, modulesPath) {
  const pattern = new RegExp(`${escapeStringRegExp(modulesPath)}/([^/\\\\]+)`);
  const match = pattern.exec(contextRoot);
  if (match && match.length > 1) {
    return match[1];
  }
  return null;
}

module.exports = {
  findModuleName
};
