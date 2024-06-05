import { getObjectFromLocalStorage, saveObjectIntoLocalStorage } from './utils.js'
import { APIClient } from './requests.js'


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
  /**
   * 
   * @param {APIClient} api 
   */
  constructor(api) {
    this.api = api
  }

  async getAll() {
    return this.api.get('/tasks')
  }

  async get(taskId) {
    return this.api.get(`/tasks/${taskId}`)
  }

  async add(task) {
    return this.api.post('/tasks', task)
  }

  async remove(task) {
    return this.api.delete(`/tasks/${task.id}`)
  }

  async update(task) {
    return this.api.put(`/tasks/${task.id}`, task)
  }
}