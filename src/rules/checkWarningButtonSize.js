const checkNode = require('../helpers/check-node');
const getCertainChildrenType = require('../helpers/get-certain-children-type');
const getLocation = require('../helpers/get-location');
const getModsValue = require('../helpers/get-mods-value');

const ERROR_MESSAGE = {
  code: 'WARNING.INVALID_BUTTON_SIZE',
  error: 'Размер кнопки блока Warning не на 1 шаг больше эталонного',
};

const BLOCK_SIZES = [
  'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl',
];

const checkWarningButtonSize = (node) => checkNode(node, 'warning', () => {
  const texts = getCertainChildrenType('text', node);
  const buttons = getCertainChildrenType('button', node);

  if (buttons[0] && texts[0]) {
    const firstTextSize = getModsValue(texts[0]).size;
    const firstButtonSize = getModsValue(buttons[0]).size;
    const buttonLocation = getLocation(buttons[0]);
    const isButtonSizeRight = BLOCK_SIZES[BLOCK_SIZES.findIndex(
      (size) => size === firstButtonSize,
    ) - 1] === firstTextSize;

    return isButtonSizeRight
      ? undefined : {
        ...ERROR_MESSAGE,
        location: buttonLocation,
      };
  }

  return undefined;
});

module.exports = checkWarningButtonSize;
