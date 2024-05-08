import { removeTaskImage, addTaskImage } from '../images.js'
import { createElement } from '../render/elements.js'
import { copyElement } from '../utils.js'
import { AutoGrowingTextArea } from './textarea.js'


function TaskTag(tag) {
  return createElement(
    'div',
    { className: 'task-tag' },
    [
      tag
    ]
  )
}


function TaskTagList(tags) {
  return createElement(
    'div',
    { className: 'task-tags' },
    [
      ...tags.map(task => TaskTag(task))
    ]
  )
}


function Task(task, onCheck, onRemove) {
  function onCheckboxClick(event) {
    onCheck(task)
  }

  function onRemoveButtonClick(event) {
    onRemove(task)
  }

  return createElement(
    'div',
    { className: 'task' + (task.isDone ? 'done' : '')},
    [
      createElement(
        'div',
        { className: 'task-first-row' },
        [
          createElement('input', { className: 'task-checkbox', type: 'checkbox', onClick: onCheckboxClick }),
          createElement('span', { className: 'task-description' }, [task.description]),
          createElement(
            'button', 
            { className: 'task-remove-button', onClick: onRemoveButtonClick},
            [
              copyElement(removeTaskImage)
            ]
          )
        ]
      ),
      TaskTagList(task.tags)
    ]
  )
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


  return createElement(
    'form',
    { className: 'task task-form', onSubmit: onFormSubmit },
    [
      createElement(
        'button',
        { className: 'task-form-button', type: 'submit' },
        [
          copyElement(addTaskImage)
        ]
      ),
      AutoGrowingTextArea({ className: 'task-form-text', placeholder: 'New task description...', onKeypress: onTextKeypress})
    ]
  )
}


export function TaskList(tasks) {
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

  return createElement(
    'div',
    { className: 'tasks' },
    [
      TaskForm(onTaskFormSubmit), 
      ...tasks.map(task => Task(task, onTaskCheck, onTaskRemove))
    ]
  )
}
