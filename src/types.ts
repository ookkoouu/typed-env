export interface TypeMap {
  string: string
  number: number
  boolean: boolean
  bigint: bigint
}
export type TypeName = keyof TypeMap
export type TypeValue = TypeMap[TypeName]

export type ToType<S extends keyof TypeMap> = S extends keyof TypeMap
  ? TypeMap[S]
  : never

export type ToName<
  T extends TypeMap[keyof TypeMap],
  S = keyof TypeMap
> = S extends keyof TypeMap ? (T extends TypeMap[S] ? S : never) : never

export type ToArray<T extends TypeName> = `${T}[]`
export type Unwrap<T = EncodeTypeName> = T extends `${infer U}[]`
  ? U extends TypeName
    ? U
    : T extends TypeName
    ? T
    : never
  : never

export type EncodeTypeName = TypeName | ToArray<TypeName>
export type EncodeType = TypeValue | TypeValue[]

export type LoadOption = Record<string, EncodeTypeName>
export type Env<T = LoadOption> = {
  [P in keyof T]: T[P] extends ToArray<Unwrap<T[P]>>
    ? Array<ToType<Unwrap<T[P]>>>
    : T[P] extends TypeName
    ? ToType<T[P]>
    : never
}
