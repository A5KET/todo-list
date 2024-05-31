const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)


export const TEXT_ELEMENT = 'TEXT_ELEMENT'

export function createDOM(fiber) {
  const dom =
    fiber.type == TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(fiber.type)

    updateDOM(dom, {}, fiber.props)

    return dom
}


function removeOldOrChangedListeners(dom, prevProps, nextProps) {
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })
}


function addNewListeners(dom, prevProps, nextProps) {
  Object.keys(nextProps)
  .filter(isEvent)
  .filter(isNew(prevProps, nextProps))
  .forEach(name => {
    const eventType = name.toLowerCase().substring(2)
    dom.addEventListener(eventType, nextProps[name])
  })
}


function removeOldProperies(dom, prevProps, nextProps) {
  Object.keys(prevProps)
  .filter(isProperty)
  .filter(isGone(prevProps, nextProps))
  .forEach(name => {
    dom[name] = ''
  })
}


function addNewProperties(dom, prevProps, nextProps) {
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}


function addRef(dom, prevProps, nextProps) {
  if (nextProps.ref) {
    nextProps.ref.current = dom
  }
}


export function updateDOM(dom, prevProps, nextProps) {
  removeOldOrChangedListeners(dom, prevProps, nextProps)
  removeOldProperies(dom, prevProps, nextProps)
  addNewProperties(dom, prevProps, nextProps)
  addNewListeners(dom, prevProps, nextProps)
  addRef(dom, prevProps, nextProps)
}