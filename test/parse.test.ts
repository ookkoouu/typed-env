import { EncodeTypeName, EncodeType } from '../src/types'
import { parse } from '../src/parse'

type ParseTestData = {
  name: string
  type: EncodeTypeName
  value: string
  expected: EncodeType
}

const trimCases: ParseTestData[] = [
  {
    name: 'trim',
    type: 'string',
    value: ' <space> zenkaku>　tab>	zenkaku>　',
    expected: '<space> zenkaku>　tab>	zenkaku>',
  },
  {
    name: 'trim array',
    type: 'string[]',
    value: ' space ,　zenkaku　,	tab	,',
    expected: ['space', 'zenkaku', 'tab'],
  },
  {
    name: 'trim array comma',
    type: 'string[]',
    value: ' , aa, bb,,,',
    expected: ['aa', 'bb'],
  },
]

const stringCases: ParseTestData[] = [
  {
    name: 'string',
    type: 'string',
    value: 'aa',
    expected: 'aa',
  },
  {
    name: 'str-array',
    type: 'string[]',
    value: ' , aa, bb, cc',
    expected: ['aa', 'bb', 'cc'],
  },
  {
    name: 'symbols',
    type: 'string',
    value: '!"#$%&\'()=~|`{+*}<>?_-^\\@[;:],./',
    expected: '!"#$%&\'()=~|`{+*}<>?_-^\\@[;:],./',
  },
  {
    name: 'symbols array',
    type: 'string[]',
    value: '!"#$%&\'()=~|`{+*}<>?_-^\\@[;:],./',
    expected: ['!"#$%&\'()=~|`{+*}<>?_-^\\@[;:]', './'],
  },
]

const numberCases: ParseTestData[] = [
  {
    name: 'dex',
    type: 'number[]',
    value: '123, 2.33, 175e-2',
    expected: [123, 2.33, 1.75],
  },
  {
    name: 'bin oct hex',
    type: 'number[]',
    value: '0b0110, 0o77, 0xff',
    expected: [6, 63, 255],
  },
  {
    name: 'bigint',
    type: 'bigint[]',
    value: '123456789123456789, 0x123456789ABCDEF',
    expected: [123456789123456789n, 81985529216486895n],
  },
]

const booleanCases: ParseTestData[] = [
  {
    name: 'true false',
    type: 'boolean[]',
    value: 'true, false',
    expected: [true, false],
  },
  {
    name: 'bool edge',
    type: 'boolean[]',
    value: ', f, 0, ,!',
    expected: [true, false, false, true],
  },
]

const cases = [...trimCases, ...stringCases, ...numberCases, ...booleanCases]

test.each(cases.map((t) => [t.name, t]))('%s', (name, data) => {
  const { type, value, expected } = data
  expect(parse(type, value)).toEqual(expected)
})
