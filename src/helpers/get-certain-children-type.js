const getPropValue = require('./get-prop-value');
const reduceTree = require('./reduce-tree');

const getCertainChildrenType = (blockName, node) => reduceTree(((tree, acc) => {
  if (getPropValue(tree, 'block') === blockName) {
    return [...acc, tree];
  }
  return acc;
}), node, []);

module.exports = getCertainChildrenType;
