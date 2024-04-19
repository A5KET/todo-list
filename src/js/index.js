import { createElement, AutoGrowingTextArea, createElementFromHTML } from './utils.js'
import { addTaskImage, removeTaskImage } from './images.js'


function TaskTag(tag) {
  return createElement(
    'div',
    { className: 'task-tag' },
    tag
  )
}


function TaskTagList(tags) {
  return createElement(
    'div',
    { className: 'task-tags' },
    ...tags.map(task => TaskTag(task))
  )
}


function Task(task, onCheck, onRemove) {
  function onCheckboxClick(event) {
    onCheck(task)
  }

  function onRemoveButtonClick(event) {
    onRemove(task)
  }
  
  const checkbox = createElement('input', { className: 'task-checkbox', type: 'checkbox' })
  checkbox.addEventListener('click', onCheckboxClick)

  const removeButton = createElement(
    'button', 
    { className: 'task-remove-button' },
    createElementFromHTML(removeTaskImage)
  )
  removeButton.addEventListener('click', onRemoveButtonClick)

  const node = createElement(
    'div',
    { className: 'task' },
    createElement(
      'div',
      { className: 'task-first-row' },
      checkbox,
      createElement('span', { className: 'task-description' }, task.description),
      removeButton
    ),
    TaskTagList(task.tags)
  )

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
      isDone: false,
      tags: []
    }

    onSubmit(newTask)
  }

  function onTextKeypress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      submitButton.click()
    }
  } 

  const submitButton = createElement(
    'button',
    { className: 'task-form-button', type: 'submit' },
    createElementFromHTML(addTaskImage)
  )

  const text = AutoGrowingTextArea({ className: 'task-form-text', placeholder: 'New task description...' })
  text.addEventListener('keypress', onTextKeypress)

  const node = createElement(
    'form',
    { className: 'task task-form' },
    submitButton,
    text
  )
  node.addEventListener('submit', onFormSubmit)

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
    updateTasks(newTasks)
  }

  const node = createElement(
    'div',
    { className: 'tasks' },
    TaskForm(onTaskFormSubmit), 
    ...tasks.map(task => Task(task, onTaskCheck, onTaskRemove))
  )

  return node
}


function App() {
  const tasks = [
    {
      description: 'Complete the research report on market trends in the tech industry for the upcoming board meeting. Begin by compiling data from the latest industry reports and reputable sources, analyzing key statistics and projections. Break down the information into relevant sections, including market size, growth drivers, competitive analysis, and emerging technologies. Draft an executive summary highlighting the most significant findings and insights.',
      isDone: false,
      tags: ['tag1', 'tag2', 'tag3']
    },
    {
      description: 'Attend yoga class at 6:00 PM',
      isDone: false,
      tags: ['tag1', 'tag2', 'tag3']
    },
    {
      description: 'Water the plants in the backyard',
      isDone: false,
      tags: ['tag1', 'tag2', 'tag3']
    },
    {
      description: 'task to do',
      isDone: false,
      tags: ['tag1', 'tag2', 'tag3']
    },
  ]

  return createElement(
    'main',
    { },
    createElement('h1', { className: 'header' }, 'TODO LIST'), 
    TaskList(tasks)
  )
}

document.body.appendChild(App())
