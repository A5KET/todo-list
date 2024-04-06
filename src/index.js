function createElement(tag, className) {
  const node = document.createElement(tag)

  if (className) {
    node.className = className
  }

  return node
}


function Task(task, onCheckbox) {
  function onCheckboxClick(event) {
    onCheckbox(task)
  }
  
  const checkbox = createElement('input', 'task-checkbox')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('click', onCheckboxClick)

  const description = createElement('span', 'task-description')
  description.innerHTML = task.description

  const node = createElement('div', 'task')
  node.appendChild(checkbox)
  node.appendChild(description)

  if (task.isDone) {
    checkbox.checked = true
    node.classList.add('done')
  }

  return node
}


function TaskList(tasks) {
  const node = createElement('div', 'tasks')

  function updateList() {
    node.replaceWith(TaskList(tasks))
  }

  function onTaskCheckbox(task) {
    task.isDone = !task.isDone
    tasks = [].concat(tasks.filter((x => !x.isDone)), tasks.filter((x => x.isDone)))
    updateList()
  }

  tasks.forEach(task => node.appendChild(Task(task, onTaskCheckbox)))

  return node
}


function App() {
  const tasks = [
    {
      description: 'Complete the research report on market trends in the tech industry for the upcoming board meeting. Begin by compiling data from the latest industry reports and reputable sources, analyzing key statistics and projections. Break down the information into relevant sections, including market size, growth drivers, competitive analysis, and emerging technologies. Draft an executive summary highlighting the most significant findings and insights.',
      isDone: false
    },
    {
      description: 'Attend yoga class at 6:00 PM',
      isDone: false
    },
    {
      description: 'Water the plants in the backyard',
      isDone: false
    },
    {
      description: 'task to do',
      isDone: false
    },
  ]


  const header = createElement('h1', 'header')
  header.innerHTML = 'TODO LIST'

  const taskList = TaskList(tasks)
  
  const node = createElement('main')
  node.appendChild(header)
  node.appendChild(taskList)

  return node
}

document.body.appendChild(App())
