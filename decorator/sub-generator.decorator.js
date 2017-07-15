const pathUtils = require('./../utils/path-utils');

module.exports = function(func, generatorName, options) {
  const prototype = func.prototype;
  NewFunction.prototype = prototype;

  const originalDefault = getDeepPrototypeProperty(func, 'default');
  prototype.default = function() {
      options.validate(this, generatorName);
      pathUtils.updateDestinationOption(this, generatorName);

      originalDefault && originalDefault();
  }

  return NewFunction;

  function NewFunction(...args) {
    const instance = instantiate(func, args);
    options.applyOptions(instance, generatorName);
    return instance;
  }
}


const getDeepPrototypeProperty = (func, prop) => {
  let prototype = func.prototype;
  while (prototype !== undefined) {
    const value = prototype[prop];
    if (value) return value;
    prototype = prototype.__prop__;
  }
  return undefined;
}

const bind = Function.bind;
const unbind = bind.bind(bind);

function instantiate(constructor, args) {
    return new (unbind(constructor, null).apply(null, args));
}

