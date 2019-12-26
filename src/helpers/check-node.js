const getProp = require('./get-prop');
const getPropValue = require('./get-prop-value');

const checkNode = (node, nodeName, checkingFn) => {
  const nodeBlockName = getPropValue(node, 'block');
  const isNodeElement = getProp(node, 'elem');

  if (nodeBlockName === nodeName && !isNodeElement) {
    return checkingFn(node);
  }

  return undefined;
};

module.exports = checkNode;
