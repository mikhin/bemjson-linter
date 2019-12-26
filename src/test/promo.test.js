const lint = require('../index');

test('Количество промо-блоков соответствует норме.', () => {
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

test('Количество промо-блоков не соответствует норме.', () => {
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
        end: { column: 2, line: 32 },
      },
    },
  ]);
});
