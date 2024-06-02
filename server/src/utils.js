import crypto from 'crypto'


export function fromSnakeCaseToCamelCase(str) {
  return str.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase())
}


export function renameObjectKey(object, oldKey, newKey) {
  if (oldName !== newName) {
    Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey))
    delete object[oldKey]
  }
}


export function isDefined(value) {
  return (typeof value !== 'undefined')
}


export function areDefined(...values) {
  values.every(isDefined)
}


export function renameObjectPropertiesFromSnakeCaseToCamelCase(object) {
  for (const key in row) {
    const newKey = fromSnakeCaseToCamelCase(key)
    renameObjectKey(row, key, newKey)
  }
}


export function generateToken() { // #TODO
  return 'boba'
}