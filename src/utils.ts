import { EncodeTypeName, TypeName } from './types'

export function getEnv(key: string): string {
  const value = process.env[key]
  if (value == null) {
    throw new Error(`Env-var '${key}' is undefined`)
  }
  return value
}

export function unwrap<T extends EncodeTypeName>(t: T): TypeName {
  const type = t.replace('[]', '')
  return type as TypeName
}

export function trimWith(deletor: string, value: string): string {
  if (deletor.includes('-')) {
    deletor = '-' + deletor.replaceAll('-', '')
  }
  const reg = RegExp(`^[${deletor}\\s]*|[${deletor}\\s]*$`, 'g')
  return value.replaceAll(reg, '')
}
