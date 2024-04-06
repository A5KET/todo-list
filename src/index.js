function createElement(tag, className) {
  const node = document.createElement(tag)

  if (className) {
    node.className = className
  }

  return node
}


function Task(task, onDelete) {
  function onCheckboxClick(event) {
    console.log('boba')
  }
  
  const checkbox = createElement('input', 'task-checkbox')
  checkbox.type = 'checkbox'

  const description = createElement('span', 'task-description')
  description.innerHTML = task.description

  const button = createElement('button')

  const node = createElement('div', 'task')
  node.appendChild(checkbox)
  node.appendChild(description)

  return node
}


function App() {
  const tasks = [
    {
      description: 'Complete the research report on market trends in the tech industry for the upcoming board meeting. Begin by compiling data from the latest industry reports and reputable sources, analyzing key statistics and projections. Break down the information into relevant sections, including market size, growth drivers, competitive analysis, and emerging technologies. Draft an executive summary highlighting the most significant findings and insights.'
    },
    {
      description: 'Attend yoga class at 6:00 PM'
    },
    {
      description: 'Water the plants in the backyard'
    },
    {
      description: 'task to do'
    },
  ]

  function onTaskDelete(task) {
    console.log(task)
  }

  const header = createElement('h1', 'header')
  header.innerHTML = 'TODO LIST'

  const taskList = createElement('div', 'tasks')
  tasks.forEach(task => taskList.appendChild(Task(task)))

  const node = createElement('main')
  node.appendChild(header)
  node.appendChild(taskList)

  return node
}

document.body.appendChild(App())
