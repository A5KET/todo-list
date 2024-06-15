export function onEnterKeyPress(callback) {
  return function(event) {
    console.log('keypress')
    if (event.keyCode === 13 && !event.shiftKey && event.target == this) {
      console.log('enter')
      event.preventDefault()
      callback(event)
    }
  }
}