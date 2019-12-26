const lint = require('../index');

test('Тексты в блоке Warning одного размера', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "l" } }
    ]
}`;

  expect(lint(string)).toMatchObject([]);
});

test('Тексты в блоке Warning разных размеров. Модификатор отсутствует.', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "text" },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      error: 'Тексты в блоке Warning разных размеров',
      location: {
        start: { column: 1, line: 1 },
        end: { column: 2, line: 7 },
      },
    },
  ]);
});

test('Тексты в блоке Warning разных размеров', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      error: 'Тексты в блоке Warning разных размеров',
      location: {
        start: { column: 1, line: 1 },
        end: { column: 2, line: 7 },
      },
    },
  ]);
});
