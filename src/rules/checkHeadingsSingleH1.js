const checkNode = require('../helpers/check-node');
const getLocation = require('../helpers/get-location');
const getModsValue = require('../helpers/get-mods-value');
const getPropValue = require('../helpers/get-prop-value');
const isStorageEntry = require('../helpers/is-storage-entry');

const ERROR_MESSAGE = {
  code: 'TEXT.SEVERAL_H1',
  error: 'Заголовок H1 на странице неединственный',
};

const checkHeadingsSingleH1 = (node, storage) => checkNode(node, 'text', () => {
  const textMods = getModsValue(node);

  const storageEntries = storage.filter((entry) => isStorageEntry(entry));
  const storageTexts = storageEntries.filter((entry) => entry && getPropValue(entry.node, 'block') === 'text');

  if (storageTexts.length > 0) {
    const isExistH1 = storageTexts.some((entry) => {
      const nodeMods = getModsValue(entry.node);
      return nodeMods && nodeMods.type === 'h1';
    });

    if (isExistH1 && textMods && textMods.type && textMods.type === 'h1') {
      const headerLocation = getLocation(node);
      return {
        ...ERROR_MESSAGE,
        location: headerLocation,
      };
    }
  }

  if (textMods && textMods.type && textMods.type === 'h1') {
    return { storageEntry: true, node };
  }

  return undefined;
});


module.exports = checkHeadingsSingleH1;
