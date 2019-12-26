const getProp = (node, name) => node && node.type === 'Object' && node.children && node.children.find(
  (child) => child.key.value === name,
);

module.exports = getProp;
