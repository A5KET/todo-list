export function getObjectFromLocalStorage(key) {
  try {
    const value = getValueFromLocalStorage(key)
    
    return JSON.parse(value)
  }
  catch (error) {
    console.error(error)
  }

  return undefined
}


export function saveObjectIntoLocalStorage(key, object) {
  saveValueIntoLocalStorage(key, JSON.stringify(object))
}


export function saveValueIntoLocalStorage(key, value) {
  window.localStorage.setItem(key, value)
}


export function getValueFromLocalStorage(key) {
  return window.localStorage.getItem(key)
}


export function removeValueFromLocalStorage(key) {
  window.localStorage.removeItem(key)
}
