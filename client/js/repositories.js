import { getObjectFromLocalStorage, saveObjectIntoLocalStorage } from './utils.js'
import { getRequest, postRequest, deleteRequest, putRequest } from './requests.js'


export class LocalStorageTaskRepository {
  constructor() {
    /** @type {Object[]} */
    this.tasks = getObjectFromLocalStorage('tasks') || []
  }

  async getAll() {
    this.tasks.sort((a, b) => a.isDone - b.isDone)

    return this.tasks
  }

  async add(taskToAdd) {
    taskToAdd.id = this.getNewId()
    this.tasks.push(taskToAdd)
    this.save()
    return this.getAll()
  }

  async remove(taskToRemove) {
    this.tasks = this.tasks.filter(task => task !== taskToRemove)
    this.save()
    return this.getAll()
  }

  async update(taskToUpdate) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskToUpdate.id) {
        this.tasks[i] = taskToUpdate
      }
    }

    this.save()
    return this.getAll()
  }

  async remove(taskToRemove) {
    this.tasks = this.tasks.filter(task => task.id != taskToRemove.id)


    this.save()
    return this.getAll()
  }

  getNewId() {
    return Math.max(...this.tasks.map(task => task.id)) + 1
  }

  save() {
    saveObjectIntoLocalStorage('tasks', this.tasks)
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