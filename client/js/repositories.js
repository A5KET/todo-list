import { getObjectFromLocalStorage, saveObjectIntoLocalStorage } from './utils.js'
import { APIClient } from './requests.js'


export class LocalStorageTaskRepository {
  constructor() {
    this.type = 'local'
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
    this.type = 'remote'
    this.api = api
  }

  async getAll() {
    return this.api.get('/tasks').then(tasks => tasks.sort((a, b) => a.isDone - b.isDone))
  }

  async add(task) {
    await this.api.post('/tasks', task)

    return this.getAll()
  }

  async remove(task) {
    await this.api.delete(`/tasks/${task.id}`)

    return this.getAll()
  }

  async update(task) {
    await this.api.put(`/tasks/${task.id}`, task)

    return this.getAll()
  }
}