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


export function getFormData(form) {
  return Object.fromEntries(new FormData(form))
}


export function multiKeyComparator(keys=[]) {
  return function(a, b) {
    for (const key of keys) {
      const comparison = a[key] - b[key]

      if (comparison != 0) {
        return comparison
      }
    }

    return 0
  }
}


export function isEnterKeyPressEvent(event) {
  return (event.keyCode === 13 && !event.shiftKey)
}