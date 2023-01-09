import { EncodeType, LoadOption, Env } from './types'
import { parse } from './parse'
import { getEnv } from './utils'

export function load<T extends LoadOption>(option: T): Env<T> {
  const res: Record<string, EncodeType> = {}
  for (const [key, encoding] of Object.entries(option)) {
    res[key] = parse(encoding, getEnv(key))
  }
  return res as ReturnType<typeof load<T>>
}
