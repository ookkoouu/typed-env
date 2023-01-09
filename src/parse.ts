import { TypeName, TypeMap, EncodeTypeName, Unwrap, ToArray } from './types'
import { unwrap, trimWith } from './utils'

export function parse<T extends EncodeTypeName>(
  type: T,
  val: string
): T extends ToArray<TypeName>
  ? Array<TypeMap[Unwrap<T>]>
  : TypeMap[Unwrap<T>] {
  function boxing<T extends TypeName>(type: T, val: string): TypeMap[T] {
    switch (type) {
      case 'string':
        return String(val) as TypeMap[T]
      case 'number':
        if (Number.isNaN(Number(val))) {
          throw new Error(`Cannot convert ${val} to a Number`)
        }
        return Number(val) as TypeMap[T]
      case 'boolean':
        if (val === 'false' || val === '0') {
          return false as TypeMap[T]
        } else {
          return Boolean(val) as TypeMap[T]
        }
      case 'bigint':
        return BigInt(val) as TypeMap[T]
      default:
        throw new Error(
          `Unknown type: ${(type as { type: '__invalid__' }).type}`
        )
    }
  }

  if (type.endsWith('[]')) {
    return trimWith(',', val)
      .split(',')
      .map((v) => v.trim())
      .map((v) => boxing(unwrap(type), v)) as ReturnType<typeof parse<T>>
  } else {
    return boxing(unwrap(type), val.trim()) as ReturnType<typeof parse<T>>
  }
}
