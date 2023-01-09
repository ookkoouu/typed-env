import { config } from 'dotenv'
import { join, resolve } from 'path'
import { load } from '../src/load'
import { LoadOption, EncodeType } from '../src/types'

type ConfigTestData = {
  name: string
  value: LoadOption
  expected: Record<string, EncodeType>
}

const trimCases: ConfigTestData[] = [
  {
    name: 'load basic',
    value: {
      Str: 'string',
      StrArr: 'string[]',
      Num: 'number',
      NumArr: 'number[]',
      Bool: 'boolean',
      BoolArr: 'boolean[]',
      Int: 'bigint',
      IntArr: 'bigint[]',
    },
    expected: {
      Str: 'abc',
      StrArr: ['aa', 'bb', '', 'dd'],
      Num: -12.34,
      NumArr: [0.123, 100, 255],
      Bool: false,
      BoolArr: [true, false, false, false, true],
      Int: 12345678901234567890n,
      IntArr: [11n, 61863n, -1234n],
    },
  },
]

const cases = [...trimCases]

test.each(cases.map((t) => [t.name, t]))('%s', (name, data) => {
  const { value, expected } = data
  // load .env
  config({
    path: resolve(join(__dirname, 'basic.env')), // '/workspaces/env-typed/test/basic.env',
    override: true,
  })
  expect(load(value)).toEqual(expected)
})
