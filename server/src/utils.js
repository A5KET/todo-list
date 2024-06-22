import crypto from 'crypto'


export function fromSnakeCaseToCamelCase(str) {
  return str.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase())
}


export function renameObjectKey(object, oldKey, newKey) {
  if (oldKey !== newKey) {
    Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey))
    delete object[oldKey]
  }
}


export function isDefined(value) {
  return (typeof value !== 'undefined')
}


export function areDefined(...values) {
  return values.every(isDefined)
}


export function renameObjectPropertiesFromSnakeCaseToCamelCase(object) {
  for (const key in object) {
    const newKey = fromSnakeCaseToCamelCase(key)
    renameObjectKey(object, key, newKey)
  }

  return object
}


export function generateToken() { 
  return crypto.randomBytes(64).toString('hex')
}


export function getAnyObjectValue(object) {
  return Object.values(object)[0]
}