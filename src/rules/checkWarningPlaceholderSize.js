const checkNode = require('../helpers/check-node');
const getLocation = require('../helpers/get-location');
const getModsFromChildren = require('../helpers/get-mods-from-children');
const getPropValue = require('../helpers/get-prop-value');
const reduceTree = require('../helpers/reduce-tree');

const ERROR_MESSAGE = {
  code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
  error: 'Блок Placeholder недопустимых размеров',
};

const PLACEHOLDER_ALLOWABLE_SIZES = [
  's', 'm', 'l',
];

const checkWarningPlaceholderSize = (node) => checkNode(node, 'warning', () => {
  const placeholdersSizes = getModsFromChildren(node, 'placeholder', 'size');

  if (placeholdersSizes.length > 0) {
    const content = reduceTree(((tree, acc) => [...acc, tree]), node, []);
    const placeholder = content.find((block) => getPropValue(block, 'block') === 'placeholder');
    const placeholderLocation = getLocation(placeholder);

    const isSizesCorrect = placeholdersSizes.every(
      (size) => PLACEHOLDER_ALLOWABLE_SIZES.includes(size),
    );

    return isSizesCorrect
      ? undefined : {
        ...ERROR_MESSAGE,
        location: placeholderLocation,
      };
  }

  return undefined;
});

module.exports = checkWarningPlaceholderSize;
