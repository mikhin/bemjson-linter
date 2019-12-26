const checkNode = require('../helpers/check-node');
const getLocation = require('../helpers/get-location');
const getModsValue = require('../helpers/get-mods-value');
const getPropValue = require('../helpers/get-prop-value');
const isStorageEntry = require('../helpers/is-storage-entry');

const ERROR_MESSAGE = {
  code: 'TEXT.INVALID_H3_POSITION',
  error: 'Заголовок H3 находится перед заголовком второго уровня',
};

const checkHeadingsValidH3 = (node, storage) => checkNode(node, 'text', () => {
  const textMods = getModsValue(node);

  const storageEntries = storage.filter((entry) => isStorageEntry(entry));
  const storageTexts = storageEntries.filter((entry) => entry && getPropValue(entry.node, 'block') === 'text');

  if (storageTexts.length > 0) {
    const lastText = [...storageTexts].pop();
    const lastTextMods = getModsValue(lastText.node);

    if (lastTextMods
      && lastTextMods.type === 'h3'
      && textMods
      && textMods.type === 'h2') {
      const h3Location = getLocation(lastText.node);

      return {
        ...ERROR_MESSAGE,
        location: h3Location,
      };
    }
  }

  if (textMods && textMods.type && textMods.type === 'h3') {
    return { storageEntry: true, node };
  }

  return undefined;
});


module.exports = checkHeadingsValidH3;
