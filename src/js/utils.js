import { createElement } from './render/elements.js'


export function createDOMFromHTML(htmlString) {
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()

  return div.firstChild;
}


/**
 * 
 * @param {Element} dom 
 */
export function createElementFromDOM(dom) {
  const props = {}

  for (const attr of dom.attributes) {
    props[attr.name] = attr.value
  }
  const children = [].slice.call(dom.children)

  return createElement(dom.tag, props, children.map(child => createElementFromDOM(child)))
}


export function createElementFromHTML(html) {
  return createElementFromDOM(createDOMFromHTML(html))
}


export function copyElement(element) {
  return Object.assign({}, element)
}


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