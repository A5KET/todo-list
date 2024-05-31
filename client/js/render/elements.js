import { TEXT_ELEMENT } from './dom.js'
import { appState } from './state.js'


export function createElement(type, props, children=[]) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object'
          ? child
          : createTextElement(child)
      )
    }
  }
}


function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    }
  }
}


export function render(element, container) {
  appState.workInProgressRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: appState.currentRoot
  }
  appState.deletions = []
  appState.nextUnitOfWork = appState.workInProgressRoot
}
