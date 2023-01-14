# About

Simple typed-parser of `process.env` .  
This is NOT a loader of `.env` such as Dotenv.

# Usage

```
STR  = hogehoge
NUM  = 1234.5
BOOL = true, false, 0, 1
INT  = 123456789
```

```ts
import { load } from 'env-typed';

const Env = load({
  STR:  'string',
  NUM:  'number',
  BOOL: 'boolean[]',
  INT:  'bigint',
});

/* parsed as */
Env = {
  STR:  'hogehoge',
  NUM:  1234.5,
  BOOL: [ true, false, false, false ],
  INT:  123456789n
}

typeof Env = {
  STR:  string;
  NUM:  number;
  BOOL: boolean[];
  INT:  bigint;
}
```

# Available Types

- `string`
- `number`
- `boolean`
- `bigint`
- Array of these

# Note

- Only strings `false`, `0` and `''`(blank) are parsed as `false` in boolean.
