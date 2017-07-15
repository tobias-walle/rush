const mapping = {};
const names = ['component', 'container', 'duck', 'module'];
names.forEach(name => mapping[name] = require(`./${name}-options.js`));

module.exports = mapping;
