import { removeTaskImage, addTaskImage } from '../images.js'
import { createElement } from '../render/elements.js'
import { AutoGrowingTextArea } from './textarea.js'
import { useState, useEffect, useRef } from '../render/hooks.js'
import { onEnterKeyPress } from '../listeners.js'


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


function Task({ task, onUpdate, onRemove,  }) {
  const [isEditable, setIsEditable] = useState(false)

  function onDoubleClick() {
    setIsEditable(true)
  }

  function onCheckboxClick(event) {
    event.preventDefault()
    task.isDone = !task.isDone
    onUpdate(task)
  }

  function onRemoveButtonClick() {
    onRemove(task)
  }

  function onDescriptionEdit(event) {
    task.description = event.target.value
    onUpdate(task)
  }

  return createElement(
    'div',
    { className: `task ${task.isDone ? 'done' : '' }`},
    [
      createElement(
        'div',
        { className: 'task-first-row' },
        [
          createElement('input', { className: 'task-checkbox', type: 'checkbox', checked: task.isDone, onClick: onCheckboxClick }),
          AutoGrowingTextArea({ className: 'task-description', readOnly: !isEditable, value: task.description, onDblclick: onDoubleClick, onKeypress: onEnterKeyPress(onDescriptionEdit) }),
          createElement(
            'button', 
            { className: 'task-remove-button', type: 'submit', onClick: onRemoveButtonClick, innerHTML: removeTaskImage},
          )
        ]
      )
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
    formRef.current.requestSubmit()
  }

  return createElement(
    'form',
    { className: 'task task-form', onSubmit: onFormSubmit, ref: formRef },
    [
      createElement(
        'button',
        { className: 'task-form-button', type: 'submit', innerHTML: addTaskImage },
      ),
      AutoGrowingTextArea({ className: 'task-description', placeholder: 'New task description...', onKeypress: onEnterKeyPress(onTextKeypress), ref: textRef })
    ]
  )
}


export function TaskList({ taskRepository }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    taskRepository.getAll().then(newTasks => setTasks(newTasks))
  }, taskRepository.type)


  function onTaskFormSubmit(newTask) {
    taskRepository.add(newTask).then(newTasks => setTasks(newTasks))
  }

  function onTaskRemove(taskToRemove) {
    taskRepository.remove(taskToRemove).then(newTasks => setTasks(newTasks))
  }

  function onTaskUpdate(taskToUpdate) {
    taskRepository.update(taskToUpdate).then(newTasks => setTasks(newTasks))
  }

  return createElement(
    'div',
    { className: 'tasks' },
    [
      createElement(TaskForm, { onSubmit: onTaskFormSubmit }), 
      ...tasks.map(task => createElement(Task, { task, onUpdate: onTaskUpdate, onRemove: onTaskRemove }))
    ]
  )
}
