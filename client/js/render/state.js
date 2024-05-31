import { createDOM, updateDOM } from './dom.js'


const effectTag = {
  UPDATE: 'UPDATE',
  PLACEMENT: 'PLACEMENT',
  DELETION: 'DELETION'
}


function commitRoot() {
  appState.deletions.forEach(processFiber)
  processFiber(appState.workInProgressRoot.child)
  appState.currentRoot = appState.workInProgressRoot
  appState.workInProgressRoot = null
}


function processFiber(fiber) {
  if (!fiber) {
    return
  }

  let domParentFiber = fiber.parent
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom 

  if (fiber.effectTag === effectTag.PLACEMENT && fiber.dom != null) {
    domParent.appendChild(fiber.dom)
  }
  else if (fiber.effectTag === effectTag.DELETION) {
    commitDeletion(fiber, domParent)
    return
  }
  else if (fiber.effectTag === effectTag.UPDATE && fiber.dom != null) {
    updateDOM(fiber.dom, fiber.alternate.props, fiber.props)
  }

  processFiber(fiber.child)
  processFiber(fiber.sibling)
}


function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  }
  else {
    commitDeletion(fiber.child, domParent)
  }
}


function updateNodeProps(oldFiber, element, workInProgressFiber) {
  return {
    type: oldFiber.type,
    props: element.props,
    dom: oldFiber.dom,
    parent: workInProgressFiber,
    alternate: oldFiber,
    effectTag: effectTag.UPDATE
  }
}


function createNewNode(element, workInProgressFiber) {
  return {
    type: element.type,
    props: element.props,
    dom: null,
    parent: workInProgressFiber,
    alternate: null,
    effectTag: effectTag.PLACEMENT
  }
}

function reconcileChildren(workInProgressFiber, elements) {
  let index = 0
  let oldFiber = workInProgressFiber.alternate && workInProgressFiber.alternate.child
  let prevSibling = null

  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    let newFiber = null

    const sameType = oldFiber && element && element.type == oldFiber.type

    if (sameType) {
      newFiber = updateNodeProps(oldFiber, element, workInProgressFiber)
    } 
    
    if (element && !sameType) {
      newFiber = createNewNode(element, workInProgressFiber)
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = effectTag.DELETION
      appState.deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      workInProgressFiber.child = newFiber
    }
    else if (element) {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}


function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  }
  else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}


function updateFunctionComponent(fiber) {
  appState.workInProgressFiber = fiber
  appState.hookIndex = 0
  appState.workInProgressFiber.hooks = []
  const children = [fiber.type(fiber.props)]

  reconcileChildren(fiber, children)
}


function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber)
  }

  reconcileChildren(fiber, fiber.props.children)
}


function workLoop(deadline) {
  let shouldYield = false
  while (appState.nextUnitOfWork && !shouldYield) {
    appState.nextUnitOfWork = performUnitOfWork(appState.nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!appState.nextUnitOfWork && appState.workInProgressRoot) {
    commitRoot()
  }

  window.requestIdleCallback(workLoop)
}


export const appState = {

}

window.requestIdleCallback(workLoop)