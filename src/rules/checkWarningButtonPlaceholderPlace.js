const checkNode = require('../helpers/check-node');
const getLocation = require('../helpers/get-location');
const getPropValue = require('../helpers/get-prop-value');
const reduceTree = require('../helpers/reduce-tree');

const ERROR_MESSAGE = {
  code: 'WARNING.INVALID_BUTTON_POSITION',
  error: 'Блок Button в блоке Warning находится перед блоком Placeholder',
};

const checkWarningButtonPlaceholderPlace = (node) => checkNode(node, 'warning', () => {
  const content = reduceTree(((tree, acc) => [...acc, tree]), node, []);
  const placeholders = content.filter((block) => getPropValue(block, 'block') === 'placeholder');
  const buttons = content.filter((block) => getPropValue(block, 'block') === 'button');

  if (placeholders.length > 0 && buttons.length > 0) {
    const buttonEarlierThanPlaceholder = buttons.find(
      (button) => placeholders.some(
        (placeholder) => content.indexOf(button) < content.indexOf(placeholder),
      ),
    );

    return !buttonEarlierThanPlaceholder
      ? undefined : {
        ...ERROR_MESSAGE,
        location: getLocation(buttonEarlierThanPlaceholder),
      };
  }

  return undefined;
});

module.exports = checkWarningButtonPlaceholderPlace;
