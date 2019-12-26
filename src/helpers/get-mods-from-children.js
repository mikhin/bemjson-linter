const getModsValue = require('./get-mods-value');
const getPropValue = require('./get-prop-value');
const reduceTree = require('./reduce-tree');

const getModsFromChildren = (block, childName, modName) => reduceTree(((tree, acc) => {
  if (getPropValue(tree, 'block') === childName) {
    const textMods = getModsValue(tree);

    if (textMods && textMods[modName]) {
      return [...acc, textMods[modName]];
    }

    if (!textMods) {
      return [...acc, undefined];
    }
  }
  return acc;
}), block, []);

module.exports = getModsFromChildren;
