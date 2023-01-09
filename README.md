# About

Simple typed-parser of `process.env` .  
This is NOT a loader of `.env` such as Dotenv.

# Usage

```env
STR = hogehoge
NUM = 1234.5
BOOL = true, false, 0, 1
INT = 123456789
```

```ts
import { load } from 'env-typed';

// env-name: type
const Env = load({
  STR: 'string',
  NUM: 'number',
  BOOL: 'boolean[]',
  INT: 'bigint',
});

/*
Env:{
  STR: 'hogehoge',
  NUM: 1234.5,
  BOOL: [ true, false, true, false ],
  INT: 123456789n
}

typeof Env = {
  STR: string;
  NUM: number;
  BOOL: boolean[];
  INT: bigint;
}
*/
```

# Note

- Strings `'false'`, `'0'` and `''` (blank) are parsed as `boolean` when specified boolean.

## Usabel types

- `string`
- `number`
- `boolean`
- `bigint`
- Array of these
