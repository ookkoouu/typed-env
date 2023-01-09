import { readFileSync } from 'fs'
export function create(filepath: string): string {
  const envfile = readFileSync(filepath).toString()
  const converted = envfile.replaceAll(/\s*=.+/g, ": 'string',")
  console.log(converted)
  return converted
}
