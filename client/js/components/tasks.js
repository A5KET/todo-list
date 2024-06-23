import { removeTaskImage, addTaskImage } from '../images.js'
import { createElement } from '../render/elements.js'
import { AutoGrowingTextArea } from './textarea.js'
import { useState, useEffect, useRef } from '../render/hooks.js'
import { isEnterKeyPressEvent } from '../utils.js'


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


function Task({ task, onUpdate, onRemove, }) {
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
    if (event.target != this || !isEnterKeyPressEvent(event)) {
      return
    }

    task.description = event.target.value
    onUpdate(task)
  }

  return createElement(
    'div',
    { className: `task ${task.isDone ? 'done' : ''}` },
    [
      createElement(
        'div',
        { className: 'task-first-row' },
        [
          createElement('input', { className: 'task-checkbox', type: 'checkbox', checked: task.isDone, onClick: onCheckboxClick }),
          createElement(
            AutoGrowingTextArea,
            {
              className: 'task-description',
              readOnly: !isEditable,
              value: task.description,
              required: true,
              onDblclick: onDoubleClick,
              onKeypress: onDescriptionEdit
            }
          ),
          createElement(
            'button',
            { className: 'task-remove-button', type: 'submit', onClick: onRemoveButtonClick, innerHTML: removeTaskImage },
          )
        ]
      )
    ]
  )
}


function TaskForm({ onSubmit }) {
  const [isSubmitable, setIsSubmitable] = useState(false)
  const formRef = useRef(undefined)
  const textRef = useRef(undefined)
  const submitButtonRef = useRef(undefined)

  function onFormSubmit(event) {
    event.preventDefault()
    const newTask = {
      description: textRef.current.value,
      isDone: false,
      tags: []
    }
    onSubmit(newTask)
    formRef.current.reset()
    setIsSubmitable(false)
  }

  function onTextKeypress(event) {
    if (event.target != this) {
      return
    }

    if (isEnterKeyPressEvent(event)) {
      formRef.current.requestSubmit()
      event.preventDefault()
    }

    setIsSubmitable(formRef.current.checkValidity())
  }

  return createElement(
    'form',
    { className: 'task task-form', ref: formRef, onSubmit: onFormSubmit },
    [
      createElement(
        'button',
        { className: `task-form-button ${isSubmitable ? '' : 'disabled' }`, type: 'submit', innerHTML: addTaskImage, ref: submitButtonRef, disabled: !isSubmitable },
      ),
      createElement(
        AutoGrowingTextArea,
        {
          className: 'task-description',
          placeholder: 'New task description...',
          ref: textRef,
          required: true,
          onKeypress: onTextKeypress
        }
      )
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
