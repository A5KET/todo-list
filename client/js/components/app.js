import { createElement } from '../render/elements.js'
import { TaskList } from './tasks.js'
import { useEffect, useState } from '../render/hooks.js'
import { SignInForm, SignUpForm } from './forms.js'


/**
 * @enum 
 */
const forms = {
  SignIn: 'signin',
  SignUp: 'signup',
  None: undefined
}


export function Header({ user,  onLinkClick }) {
  return createElement(
    'header',
    { },
    [
      createElement(
        'div', 
        { className: 'auth' },
        [
          user ? 
          createElement(
            'div', 
            { className: 'user' }, 
            [
              createElement('img', { src: '/img/user.svg'}),
              user.username
            ]
          ) : undefined,
          createElement('a', { className: 'sign-link', textContent: user ? 'sign out' : 'sign in', onClick: onLinkClick })

        ]
      ),
      createElement('h1', { className: 'title' }, ['TODO LIST']),
    ]
  )
}


export function App({ taskRepositoryFactory, userInfo }) {
  const [user, setUser] = useState(undefined)
  const [currentForm, setCurrentForm] = useState(forms.None)
  const [currentFormError, setCurrentFormError] = useState(undefined)
  const taskRepository = taskRepositoryFactory(user)

  useEffect(() => {
    userInfo.get().then(user => setUser(user))
  }, [])

  function onSignInFormLinkClick() {
    setCurrentForm(forms.SignIn)
  }

  function onSignUpFormLinkClick() {
    setCurrentForm(forms.SignUp)
  }

  function onFormClose() {
    setCurrentFormError(undefined)
    setCurrentForm(undefined)
  }

  function onSignOutFormLinkClick() {
    userInfo.signOut().then(user => setUser(user))
  }

  function handleSignRequest(request) {
    request.then(user => {
      setUser(user)
      onFormClose()
    })
    .catch(error => {
      setCurrentFormError(error.message)
    })
  }

  function onSignInSubmit(data) {
    handleSignRequest(userInfo.signIn(data))
  }

  function onSignUpSubmit(data) {
    handleSignRequest(userInfo.signUp(data))
  }

  let form = undefined
  if (currentForm == forms.SignIn) {
    form = createElement(
      SignInForm, 
      { onClose: onFormClose, onLinkClick: onSignUpFormLinkClick, onSubmit: onSignInSubmit, error: currentFormError }
    )
  }
  else if (currentForm == forms.SignUp) {
    form = createElement(
      SignUpForm, 
      { onClose: onFormClose, onLinkClick: onSignInFormLinkClick, onSubmit: onSignUpSubmit, error: currentFormError }
    )
  }

  return createElement(
    'div',
    { className: 'root' },
    [
      form,
      createElement(Header, { user, onLinkClick: user ? onSignOutFormLinkClick : onSignInFormLinkClick }),
      createElement(
        'main',
        { },
        [
          createElement(TaskList, { taskRepository })
        ]
      )
    ]
  )
}