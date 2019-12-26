const getPropValue = require('./get-prop-value');

const getModsValue = (node) => {
  const mods = getPropValue(node, 'mods') || getPropValue(node, 'elemMods');

  return mods && mods.reduce((modsValues, mod) => {
    const key = mod.key.value;
    const { value } = mod.value;

    return {
      ...modsValues,
      [key]: value,
    };
  }, {});
};

module.exports = getModsValue;
