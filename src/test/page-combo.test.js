const lint = require('../index');

test('Количество промо-блоков не соответствует норме. Тексты в блоке Warning разных размеров.', () => {
  const string = `{
  "block": "grid",
  "mods": {
    "m-columns": "10"
  },
  "content": [
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "8"
      },
      "content": [
        {
          "block": "payment"
        },
        {
          "block": "warning",
          "content": [
              { "block": "text", "mods": { "size": "l" } },
              { "block": "text", "mods": { "size": "l" } }
          ]
        }
      ]
    },
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "2"
      },
      "content": [
        {
          "block": "offer"
        }
      ]
    }
  ]
}`;

  expect(lint(string)).toMatchObject([]);
});

test('Combo: incorrect', () => {
  const string = `{
  "block": "grid",
  "mods": {
    "m-columns": "10"
  },
  "content": [
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "2"
      },
      "content": [
        {
          "block": "payment"
        },
        {
          "block": "warning",
          "content": [
              { "block": "text", "mods": { "size": "l" } },
              { "block": "text", "mods": { "size": "m" }}
          ]
        }
      ]
    },
    {
      "block": "grid",
      "elem": "fraction",
      "elemMods": {
        "m-col": "8"
      },
      "content": [
        {
          "block": "offer"
        }
      ]
    }
  ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
      error: 'Количество промо-блоков не соответствует норме.',
      location: {
        start: { column: 1, line: 1 },
        end: { column: 2, line: 39 },
      },
    },
    {
      code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      error: 'Тексты в блоке Warning разных размеров',
      location: {
        start: { column: 9, line: 17 },
        end: { column: 10, line: 23 },
      },
    },
  ]);
});
