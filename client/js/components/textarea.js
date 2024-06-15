import { createElement } from '../render/elements.js'
import { useState } from '../render/hooks.js'


export function AutoGrowingTextArea(props) {
  return createElement(
    'div',
    Object.assign(
      {
        onInput: undefined,
        onSubmit: undefined,
        className: `textarea-wrapper ${props.className || ''}`, 
      }),
    [
      createElement('textarea', props)
    ]
  )
}
