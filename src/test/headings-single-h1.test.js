const lint = require('../index');

test('Заголовок H1 на странице единственный', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

  expect(lint(string)).toMatchObject([]);
});

test('Заголовок H1 на странице неединственный. Заголовки на одном уровне.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
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
        start: { column: 5, line: 6 },
        end: { column: 6, line: 9 },
      },
    },
  ]);
});

test('Заголовок H1 на странице неединственный. Заголовки на разных уровнях.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "p" },
        "content": [
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]
    }
]`;

  expect(lint(string)).toMatchObject([{
    code: 'TEXT.SEVERAL_H1',
    error: 'Заголовок H1 на странице неединственный',
    location: {
      start: { line: 10, column: 13 },
      end: { line: 13, column: 14 },
    },
  }]);
});
