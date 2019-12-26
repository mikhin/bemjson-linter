const lint = require('../index');

test('Блок Placeholder допустимых размеров', () => {
  const string = `{
  "block": "warning",
  "content": [
    { "block": "placeholder", "mods": { "size": "m" }}
  ]
}`;

  expect(lint(string)).toMatchObject([]);
});

test('Блок Placeholder недопустимых размеров', () => {
  const string = `{
  "block": "warning",
  "content": [
    { "block": "placeholder", "mods": { "size": "xl" }}
  ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
      error: 'Блок Placeholder недопустимых размеров',
      location: {
        start: { column: 5, line: 4 },
        end: { column: 56, line: 4 },
      },
    },
  ]);
});
