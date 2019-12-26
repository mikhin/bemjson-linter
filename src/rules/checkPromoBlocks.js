const checkNode = require('../helpers/check-node');
const getLocation = require('../helpers/get-location');
const getModsValue = require('../helpers/get-mods-value');
const getPropValue = require('../helpers/get-prop-value');

const ERROR_MESSAGE = {
  code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
  error: 'Количество промо-блоков не соответствует норме.',
};

const ALLOWABLE_PROMO_PERCENTAGE = 0.5;
const GRID_WIDTH_MOD = 'm-columns';
const FRACTION_WIDTH_MODS = 'm-col';

const checkPromoBlocks = (node) => checkNode(node, 'grid', () => {
  const nodeLocation = getLocation(node);
  const mods = getModsValue(node);
  const gridWidth = mods[GRID_WIDTH_MOD];

  const fractions = getPropValue(node, 'content');

  const promoFractionWidth = fractions.reduce((width, fraction) => {
    const fractionMods = getModsValue(fraction);
    const fractionContent = getPropValue(fraction, 'content');

    const hasPromo = fractionContent.some((block) => {
      const blockName = getPropValue(block, 'block');
      return blockName === 'offer' || blockName === 'commercial';
    });

    if (hasPromo) {
      return width + parseInt(fractionMods[FRACTION_WIDTH_MODS], 10);
    }

    return width;
  }, 0);

  const tooMuchPromo = promoFractionWidth / gridWidth < ALLOWABLE_PROMO_PERCENTAGE;

  return tooMuchPromo
    ? undefined : {
      ...ERROR_MESSAGE,
      location: nodeLocation,
    };
});

module.exports = checkPromoBlocks;
