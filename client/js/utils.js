export function areDeepEqual(val1, val2) {
  if (typeof val1 !== 'object' || typeof val2 !== 'object' || val1 === null || val2 === null) {
      return val1 === val2;
  }

  if (Array.isArray(val1) !== Array.isArray(val2)) {
      return false;
  }

  if (Array.isArray(val1)) {
      if (val1.length !== val2.length) {
          return false;
      }
      for (let i = 0; i < val1.length; i++) {
          if (!areDeepEqual(val1[i], val2[i])) {
              return false;
          }
      }
  } else {
      const keys1 = Object.keys(val1);
      const keys2 = Object.keys(val2);
      if (keys1.length !== keys2.length) {
          return false;
      }
      for (let key of keys1) {
          if (!keys2.includes(key) || !areDeepEqual(val1[key], val2[key])) {
              return false;
          }
      }
  }

  return true;
}


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


export function getFormData(form) {
  return Object.fromEntries(new FormData(form))
}