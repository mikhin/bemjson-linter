const lint = require('../index');

test('Заголовок H2 находится перед заголовком первого уровня и заголовок H1 на странице неединственный', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

  expect(lint(string)).toMatchObject([
    {
      code: 'TEXT.SEVERAL_H1',
      error: 'Заголовок H1 на странице неединственный',
      location: {
        start: { column: 5, line: 14 },
        end: { column: 6, line: 17 },
      },
    },
    {
      code: 'TEXT.INVALID_H2_POSITION',
      error: 'Заголовок H2 находится перед заголовком первого уровня',
      location: {
        start: { line: 10, column: 5 },
        end: { line: 13, column: 6 },
      },
    }]);
});
