const lint = require('../index');

test('Заголовок H3 не находится перед заголовком второго уровня', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h3" }
    }
]`;

  expect(lint(string)).toMatchObject([]);
});

test('Заголовок H3 находится перед заголовком второго уровня. Заголовки на одном уровне.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;

  expect(lint(string)).toMatchObject([{
    code: 'TEXT.INVALID_H3_POSITION',
    error: 'Заголовок H3 находится перед заголовком второго уровня',
    location: {
      start: { line: 2, column: 5 },
      end: { line: 5, column: 6 },
    },
  }]);
});

test('Заголовок H3 находится перед заголовком второго уровня. Заголовки на разных уровнях.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "p" },
        "content": [
            {
                "block": "text",
                "mods": { "type": "h2" }
            }
        ]
    }
]`;

  expect(lint(string)).toMatchObject([{
    code: 'TEXT.INVALID_H3_POSITION',
    error: 'Заголовок H3 находится перед заголовком второго уровня',
    location: {
      start: { line: 2, column: 5 },
      end: { line: 5, column: 6 },
    },
  }]);
});

test('Заголовок H3 находится перед заголовком второго уровня. Ошибке предшествует правильный кейс.', () => {
  const string = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;

  expect(lint(string)).toMatchObject([{
    code: 'TEXT.INVALID_H3_POSITION',
    error: 'Заголовок H3 находится перед заголовком второго уровня',
    location: {
      start: { line: 10, column: 5 },
      end: { line: 13, column: 6 },
    },
  }]);
});
