export function createElement(tag, className) {
  const node = document.createElement(tag)

  if (className) {
    node.className = className
  }

  return node
}


export function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

export function AutoGrowingTextArea(className, placeholder) {
  const node = createElement('div', 'textarea-wrapper ' + className)
  const textarea = createElement('textarea', className)

  if (placeholder) {
    textarea.placeholder = placeholder
  }

  textarea.addEventListener('input', (event) => {
    node.dataset.replicatedValue = textarea.value
    node.value = textarea.value
  })

  node.appendChild(textarea)

  return node
}


