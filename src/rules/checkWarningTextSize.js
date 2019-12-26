const checkNode = require('../helpers/check-node');
const getLocation = require('../helpers/get-location');
const getModsFromChildren = require('../helpers/get-mods-from-children');

const ERROR_MESSAGE = {
  code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
  error: 'Тексты в блоке Warning разных размеров',
};

const checkWarningTextSize = (node) => checkNode(node, 'warning', () => {
  const nodeLocation = getLocation(node);

  const textSizes = getModsFromChildren(node, 'text', 'size');

  if (textSizes.includes(undefined)) {
    return {
      ...ERROR_MESSAGE,
      location: nodeLocation,
    };
  }

  const textUniqueSizes = textSizes.filter((value, index, self) => self.indexOf(value) === index);
  const areTextSizesAreSame = textUniqueSizes.length <= 1;

  return areTextSizesAreSame
    ? undefined : {
      ...ERROR_MESSAGE,
      location: nodeLocation,
    };
});

module.exports = checkWarningTextSize;
