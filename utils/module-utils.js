const escapeStringRegExp = require('escape-string-regexp');

function findModuleName(contextRoot, modulesPath) {
  const pattern = new RegExp(`${escapeStringRegExp(modulesPath)}/([^/\\\\]+)`);
  const match = pattern.exec(contextRoot);
  if (match && match.length > 1) {
    return match[1];
  }
  throw Error('You are not in a module folder. ' +
      'You have to be in a module folder or set the --module option.');
}

function getModulesPath(yoConfig) {
  const modulesPath = yoConfig.get('modulesPath');
  if (!modulesPath) {
    throw Error('Your ".yo-rc.json" does not have the option "modulePath" or does not exists. ' +
      'Please make sure you are in an typed-react-base project and the "modulePath" option  is set.');
  }
  return modulesPath;
}

function getRelativeDestination(contextRoot, moduleName, modulesPath) {
  if (!moduleName) {
    moduleName = findModuleName(contextRoot, modulesPath);
  }
  return `${modulesPath}/${moduleName}`;
}

module.exports = {
  findModuleName,
  getModulesPath,
  getRelativeDestination
};
