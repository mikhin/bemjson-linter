const getLocation = (node) => {
  const { loc } = node;

  return {
    start: { line: loc.start.line, column: loc.start.column },
    end: { line: loc.end.line, column: loc.end.column },
  };
};

module.exports = getLocation;
