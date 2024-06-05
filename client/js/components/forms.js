import { createElement } from '../render/elements.js'
import { useRef } from '../render/hooks.js'
import { getFormData } from '../utils.js'


export function FormField(props) {
  return createElement(
    'div',
    { className: 'form-field' },
    [
      createElement(
        'input', 
        props
      )
    ]
  )
}


export function Overlay({ onClose, children }) {
  function onOverlayClose(event) {
    if (event.target == this) {
      onClose(event)
    }
  }

  return createElement(
    'div',
    { className: 'overlay', onClick: onOverlayClose },
    children
  )
}


function FormError({ error }) {
  return createElement(
    'div', 
    { className: 'form-error' + (error ? '' : ' invisible'), textContent: error }
  )
}


export function SignInForm({ onSubmit, onClose, onLinkClick, error }) {
  function onFormClose() {
    onClose()
  }

  function onFormSubmit(event) {
    event.preventDefault()
    const form = event.target 
    const formData = getFormData(form)
    onSubmit(formData)
  }

  return createElement(
    Overlay,
    { onClose: onFormClose },
    [
      createElement(
        'form', 
        { className: 'sign-form', onSubmit: onFormSubmit },
        [
          createElement('span', { className: 'heading', textContent: 'Sign In' }),
          createElement(FormError, { error }),
          createElement(FormField, { name: 'email', type: 'email', placeholder: 'email...', minlength: 6, required: true }),
          createElement(FormField, { name: 'password', type: 'password', placeholder: 'password...', minlength: 6, required: true }),
          createElement('button', { type: 'submit', textContent: 'Sign In' }),
          createElement('span', { className: 'link', textContent: "Don't have an account? " }, [
            createElement('a', { onClick: onLinkClick, textContent: 'Sign up' })
          ])
        ]
      )
    ]
  )
}


export function SignUpForm({ onSubmit, onClose, onLinkClick, error }) {
  function onRepeatPasswordChange(event) {

  }

  function onFormSubmit(event) {
    event.preventDefault()
    const form = event.target 
    const formData = getFormData(form)

    onSubmit(formData)
  }

  return createElement(
    Overlay, 
    { onClose },
    [
      createElement(
        'form', 
        { className: 'sign-form', onSubmit: onFormSubmit },
        [
          createElement('span', { className: 'heading', textContent: 'Sign Up' }),
          createElement(FormError, { error }),
          createElement(FormField, { name: 'username', placeholder: 'username...', minlength: 6, required: true }),
          createElement(FormField, { name: 'email', type: 'email', placeholder: 'email...', minlength: 6, required: true }),
          createElement(FormField, { name: 'password', type: 'password', placeholder: 'password...', minlength: 6, required: true }),
          createElement(FormField, { name: 'confirmPassword', type: 'password', placeholder: 'confirm password...', minlength: 6, required: true, onChange: onRepeatPasswordChange }),
          createElement('button', { type: 'submit', textContent: 'Sign Up' }),
          createElement('span', { className: 'link', textContent: 'Already have an account? ' }, [
            createElement('a', { onClick: onLinkClick, textContent: 'Sign in' })
          ])
        ]
      )
    ]
  )
}