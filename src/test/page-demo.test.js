const lint = require('../index');

test('Размер кнопки блока Warning на 1 шаг больше эталонного', () => {
  const json = `{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
    ]
}`;

  expect(lint(json)).toMatchObject([
    {
      code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      error: 'Тексты в блоке Warning разных размеров',
      location: {
        start: { column: 1, line: 1 },
        end: { column: 2, line: 22 },
      },
    },
  ]);
});
