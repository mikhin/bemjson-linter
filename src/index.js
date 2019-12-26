const jsonToAst = require('json-to-ast');
const isStorageEntry = require('./helpers/is-storage-entry');
const reduceTree = require('./helpers/reduce-tree');

const RULES = [
  require('./rules/checkPromoBlocks'),
  require('./rules/checkWarningButtonPlaceholderPlace'),
  require('./rules/checkWarningButtonSize'),
  require('./rules/checkWarningPlaceholderSize'),
  require('./rules/checkWarningTextSize'),
  require('./rules/checkHeadingsSingleH1'),
  require('./rules/checkHeadingsValidH2'),
  require('./rules/checkHeadingsValidH3'),
];

const checkEveryNodeByListOfRules = (currentNode, errors) => [
  ...errors,
  ...RULES.map((checkRuleFn) => checkRuleFn(currentNode, errors)),
];

const lint = (string) => {
  if (!string || string.length <= 0) {
    return [];
  }

  const tree = jsonToAst(string);
  return reduceTree(checkEveryNodeByListOfRules, tree, [], [])
    .filter(Boolean)
    .filter((entry) => !isStorageEntry(entry));
};

module.exports = lint;
