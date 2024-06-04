import { getObjectFromLocalStorage, saveObjectIntoLocalStorage } from './utils.js'
import { getRequest, postRequest, deleteRequest, putRequest } from './requests.js'


export class LocalStorageTaskRepository {
  constructor() {
    /** @type {Object[]} */
    this._tasks = getObjectFromLocalStorage('tasks') || []
  }

  async getAll() {
    this.tasks.sort((a, b) => a.isDone - b.isDone)

    return this.tasks
  }

  async add(taskToAdd) {
    taskToAdd.id = this.getNewId()
    this.tasks = [...this.tasks, taskToAdd]

    return this.getAll()
  }

  async remove(taskToRemove) {
    this.tasks = this.tasks.filter(task => task !== taskToRemove)

    return this.getAll()
  }

  async update(taskToUpdate) {
    const newTasks = this.tasks.slice()

    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == taskToUpdate.id) {
        newTasks[i] = taskToUpdate
      }
    }
    this.tasks = newTasks

    return this.getAll()
  }

  async remove(taskToRemove) {
    this.tasks = this.tasks.filter(task => task.id != taskToRemove.id)

    return this.getAll()
  }

  getNewId() {
    return Math.max(...this.tasks.map(task => task.id)) + 1
  }


  get tasks() {
    return this._tasks
  }

  set tasks(newTasks) {
    saveObjectIntoLocalStorage('tasks', newTasks)
    this._tasks = newTasks  
  } 
}


export class RemoteTaskRepository {
  async getAll() {
    return getRequest('/api/tasks')
  }

  async get(taskId) {
    return getRequest(`/api/tasks/${taskId}`)
  }

  async add(task) {
    return postRequest('/api/tasks', task)
  }

  async remove(task) {
    return deleteRequest(`/api/tasks/${task.id}`)
  }

  async update(task) {
    return putRequest(`/api/tasks/${task.id}`, task)
  }
}