export function createElement(type, props, ...children) {
  const node = document.createElement(type)
  
  Object.assign(node, props)

  for (const child of children) {
    node.appendChild(typeof child === 'object' ? child : createTextElement(child))
  }

  return node
}


export function createTextElement(text) {
  return document.createTextNode(text)
}


export function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}


export function AutoGrowingTextArea(props) {
  const textarea = createElement('textarea', props)

  textarea.addEventListener('input', (event) => {
    node.dataset.replicatedValue = textarea.value
    node.value = textarea.value
  })

  const node = createElement('div', props, textarea)
  node.classList.add('textarea-wrapper')

  return node
}


