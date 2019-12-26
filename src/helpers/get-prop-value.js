const getProp = require('./get-prop');

const getPropValue = (node, name) => {
  const prop = getProp(node, name);
  return prop ? prop.value.value || prop.value.children : undefined;
};

module.exports = getPropValue;
