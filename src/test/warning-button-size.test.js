const lint = require('../index');

test('Размер кнопки блока Warning на 1 шаг больше эталонного', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}`;

  expect(lint(string)).toMatchObject([]);
});

test('Размер кнопки блока Warning не на 1 шаг больше эталонного', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.INVALID_BUTTON_SIZE',
      error: 'Размер кнопки блока Warning не на 1 шаг больше эталонного',
      location: {
        start: { column: 9, line: 5 },
        end: { column: 55, line: 5 },
      },
    },
  ]);
});
