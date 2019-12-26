const lint = require('../index');

test('Блок Button в блоке Warning не находится перед блоком Placeholder', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } }
    ]
}`;

  expect(lint(string)).toMatchObject([]);
});

test('Блок Button в блоке Warning находится перед блоком Placeholder. Блоки на одном уровне.', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.INVALID_BUTTON_POSITION',
      error: 'Блок Button в блоке Warning находится перед блоком Placeholder',
      location: {
        start: { column: 9, line: 4 },
        end: { column: 55, line: 4 },
      },
    },
  ]);
});

test('Блок Button в блоке Warning находится перед блоком Placeholder. Ошибке предшествует правильный кейс.', () => {
  const string = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.INVALID_BUTTON_POSITION',
      error: 'Блок Button в блоке Warning находится перед блоком Placeholder',
      location: {
        start: { column: 9, line: 5 },
        end: { column: 55, line: 5 },
      },
    },
  ]);
});

test('Блок Button в блоке Warning находится перед блоком Placeholder. Блоки на разных уровнях.', () => {
  const string = `{
    "block": "warning",
    "content": [
        {
          "block": "demo",
          "content": [
            { "block": "button", "mods": { "size": "m" } }
          ]
        },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

  expect(lint(string)).toMatchObject([
    {
      code: 'WARNING.INVALID_BUTTON_POSITION',
      error: 'Блок Button в блоке Warning находится перед блоком Placeholder',
      location: {
        start: { column: 13, line: 7 },
        end: { column: 59, line: 7 },
      },
    },
  ]);
});
