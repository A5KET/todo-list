import { createElement } from '../render/elements.js'
import { useState } from '../render/hooks.js'


export function AutoGrowingTextArea(props) {
  const [value, setValue] = useState('')

  return createElement(
    'div',
    Object.assign({}, props, { value, onInput: (event) => setValue(event.target.value), className: 'textarea-wrapper ' + (props.className || ''), onKeypress: undefined }),
    [
      createElement('textarea', props)
    ]
  )
}
