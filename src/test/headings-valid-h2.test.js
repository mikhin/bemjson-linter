const lint = require('../index');

test('Заголовок H2 не находится перед заголовком первого уровня', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;

  expect(lint(string)).toMatchObject([]);
});

test('Заголовок H2 находится перед заголовком первого уровня. Заголовки на одном уровне.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

  expect(lint(string)).toMatchObject([{
    code: 'TEXT.INVALID_H2_POSITION',
    error: 'Заголовок H2 находится перед заголовком первого уровня',
    location: {
      start: { line: 2, column: 5 },
      end: { line: 5, column: 6 },
    },
  }]);
});

test('Заголовок H2 находится перед заголовком первого уровня. Заголовки на разных уровнях.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
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
    code: 'TEXT.INVALID_H2_POSITION',
    error: 'Заголовок H2 находится перед заголовком первого уровня',
    location: {
      start: { line: 2, column: 5 },
      end: { line: 5, column: 6 },
    },
  }]);
});
