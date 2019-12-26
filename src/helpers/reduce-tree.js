const getPropValue = require('./get-prop-value');

const reduceTree = (f, tree, acc) => {
  const content = tree.type === 'Array' ? tree.children : getPropValue(tree, 'content');
  const newTree = f(tree, acc);

  if (!content || typeof content === 'string') {
    return newTree;
  }

  return content.reduce((iAcc, n) => reduceTree(f, n, iAcc), newTree);
};

module.exports = reduceTree;
