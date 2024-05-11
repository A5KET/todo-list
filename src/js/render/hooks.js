import { appState } from './state.js'
import { areDeepEqual } from '../utils.js'


function getOldHook() {
  return (
    appState.workInProgressFiber.alternate && 
    appState.workInProgressFiber.alternate.hooks && 
    appState.workInProgressFiber.alternate.hooks[appState.hookIndex]
  )
}


function pushHook(hook) {
  appState.workInProgressFiber.hooks.push(hook)
  appState.hookIndex++
}


export function useState(initial) {
  const oldHook = getOldHook()

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action instanceof Function ? action(hook.state) : action
  })

  const setState = action => {
    hook.queue.push(action)

    appState.workInProgressRoot = {
      dom: appState.currentRoot.dom,
      props: appState.currentRoot.props,
      alternate: appState.currentRoot
    }
    appState.nextUnitOfWork = appState.workInProgressRoot
    appState.deletions = []
  }

  pushHook(hook)

  return [hook.state, setState]
}


export function useEffect(callback, dependencies) {
  const oldHook = getOldHook()

  const hook = {
    dependencies
  }

  if (!oldHook) {
    callback()
  }
  else {
    if (!areDeepEqual(oldHook.dependencies, hook.dependencies)) {
      callback()
    }
  }

  pushHook(hook)
}


export function useRef(initial) {
  const oldHook = getOldHook()

  const hook = {
    value: oldHook ? oldHook.value : { current: initial }
  }

  pushHook(hook)

  return hook.value
}