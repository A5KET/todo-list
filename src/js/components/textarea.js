import { createElement } from '../render/elements.js'


export function AutoGrowingTextArea(props) {
  function onInput(event) {
    node.dataset.replicatedValue = textarea.value
    node.value = textarea.value
    if (props.onInput) {
      props.onInput(event)
    }
  }

  return createElement(
    'div',
    Object.assign(props, { onInput: onInput, className: 'textarea-wrapper ' + (props.className || '') }),
    [
      createElement('textarea', props)
    ]
  )
}
