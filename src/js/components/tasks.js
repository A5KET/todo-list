import { removeTaskImage, addTaskImage } from '../images.js'
import { createElement } from '../render/elements.js'
import { AutoGrowingTextArea } from './textarea.js'
import { useState, useEffect, useRef } from '../render/hooks.js'


function TaskTag({ tag }) {
  return createElement(
    'div',
    { className: 'task-tag' },
    [
      tag
    ]
  )
}


function TaskTagList({ tags }) {
  return createElement(
    'div',
    { className: 'task-tags' },
    [
      ...tags.map(tag => createElement(TaskTag, { tag }))
    ]
  )
}


function Task({ task, onCheck, onRemove }) {
  function onCheckboxClick(event) {
    event.target.checked = false
    onCheck(task)
  }

  function onRemoveButtonClick(event) {
    onRemove(task)
  }

  return createElement(
    'div',
    { className: 'task' + (task.isDone ? ' done' : '')},
    [
      createElement(
        'div',
        { className: 'task-first-row' },
        [
          createElement('input', { className: 'task-checkbox', type: 'checkbox', checked: task.isDone, onClick: onCheckboxClick }),
          createElement('span', { className: 'task-description' }, [task.description]),
          createElement(
            'button', 
            { className: 'task-remove-button', type: 'submit', onClick: onRemoveButtonClick, innerHTML: removeTaskImage},
          )
        ]
      ),
      createElement(TaskTagList, { tags: task.tags })
    ]
  )
}


function TaskForm({ onSubmit }) {
  const formRef = useRef(null)
  const textRef = useRef(null)

  function onFormSubmit(event) {
    event.preventDefault()
    const newTask = {
      description: textRef.current.value,
      isDone: false,
      tags: []
    }
    onSubmit(newTask)
    formRef.current.reset()
  }

  function onTextKeypress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      formRef.current.requestSubmit()
    }
  }

  return createElement(
    'form',
    { className: 'task task-form', onSubmit: onFormSubmit, ref: formRef },
    [
      createElement(
        'button',
        { className: 'task-form-button', type: 'submit', innerHTML: addTaskImage },
      ),
      AutoGrowingTextArea({ className: 'task-form-text', placeholder: 'New task description...', onKeypress: onTextKeypress, ref: textRef })
    ]
  )
}


export function TaskList({ repository }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    updateTasks()
  })

  function updateTasks() {
    repository.getAll().then(newTasks => setTasks([].concat(newTasks.filter((x => !x.isDone)), tasks.filter((x => x.isDone)))))
  }


  function onTaskFormSubmit(newTask) {
    repository.add(newTask)
    updateTasks()
  }

  function onTaskCheck(checkedTask) {
    checkedTask.isDone = !checkedTask.isDone
    updateTasks()
  }

  function onTaskRemove(taskToRemove) {
    repository.remove(taskToRemove)
    updateTasks()
  }

  return createElement(
    'div',
    { className: 'tasks' },
    [
      createElement(TaskForm, { onSubmit: onTaskFormSubmit }), 
      ...tasks.map(task => createElement(Task, { task, onCheck: onTaskCheck, onRemove: onTaskRemove }))
    ]
  )
}
