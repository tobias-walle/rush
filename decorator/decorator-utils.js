module.exports = {
  decorate(func, {
    prepend = {},
    constructor
  } = {}) {
    Object.keys(prepend).forEach(key => {
      prependToFunction(func, key, prepend[key]);
    });
    if (constructor) {
      func = createExtendedConstructor(func, constructor);
    }
    return func;
  }
};

const prependToFunction = (func, property, newFunction) => {
  const original = getDeepPrototypeProperty(func, property);
  func.prototype[property] = function (...params) {
    newFunction.bind(this)(...params);
    original && original.bind(this)(...params);
  };
};

const createExtendedConstructor = (func, newConstructor) => {
  NewFunction.prototype = func.prototype;
  return NewFunction;

  function NewFunction(...args) {
    const instance = instantiate(func, args);
    newConstructor.bind(instance)(...args);
    return instance;
  }
};

const getDeepPrototypeProperty = (func, prop) => {
  let prototype = func.prototype;
  while (prototype !== undefined) {
    const value = prototype[prop];
    if (value) return value;
    prototype = prototype.__prop__;
  }
  return undefined;
};

function instantiate(constructor, args) {
  const bind = Function.bind;
  const unbind = bind.bind(bind);

  return new(unbind(constructor, null).apply(null, args));
}
