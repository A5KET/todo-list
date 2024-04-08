import { createElement, AutoGrowingTextArea, createElementFromHTML } from './utils.js'
import { addTaskImage, removeTaskImage } from './images.js'


function Task(task, onCheck, onRemove) {
  function onCheckboxClick(event) {
    onCheck(task)
  }

  function onRemoveButtonClick(event) {
    onRemove(task)
  }
  
  const checkbox = createElement('input', 'task-checkbox')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('click', onCheckboxClick)

  const description = createElement('span', 'task-description')
  description.innerHTML = task.description

  const removeButton = createElement('button', 'task-remove-button')
  removeButton.appendChild(createElementFromHTML(removeTaskImage))
  removeButton.addEventListener('click', onRemoveButtonClick)

  const node = createElement('div', 'task')
  node.appendChild(checkbox)
  node.appendChild(description)
  node.appendChild(removeButton)

  if (task.isDone) {
    checkbox.checked = true
    node.classList.add('done')
  }

  return node
}


function TaskForm(onSubmit) {
  function onFormSubmit(event) {
    event.preventDefault()
    const newTask = {
      description: text.value,
      isDone: false
    }

    onSubmit(newTask)
  }

  function onTextKeypress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      submitButton.click()
    }
  } 

  const submitButton = createElement('button', 'task-form-button')
  submitButton.appendChild(createElementFromHTML(addTaskImage))
  submitButton.type = 'submit'

  const text = AutoGrowingTextArea('task-form-text', 'New task description...')
  text.addEventListener('keypress', onTextKeypress)

  const node = createElement('form', 'task task-form')
  node.addEventListener('submit', onFormSubmit)
  node.appendChild(submitButton)
  node.appendChild(text)

  return node
}


function TaskList(tasks) {
  function updateTasks(newTasks) {
    node.replaceWith(TaskList(newTasks))
  }

  function onTaskFormSubmit(newTask) {
    const newTasks = tasks.slice()
    newTasks.push(newTask)
    updateTasks(newTasks)
  }

  function onTaskCheck(checkedTask) {
    checkedTask.isDone = !checkedTask.isDone
    const newTasks = [].concat(tasks.filter((x => !x.isDone)), tasks.filter((x => x.isDone)))
    updateTasks(newTasks)
  }

  function onTaskRemove(removedTask) {
    const newTasks = tasks.filter(task => task !== removedTask)
    updateTasks(newTasks)
  }

  const taskForm = TaskForm(onTaskFormSubmit)

  const node = createElement('div', 'tasks')
  node.appendChild(taskForm)
  tasks.forEach(task => node.appendChild(Task(task, onTaskCheck, onTaskRemove)))

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
