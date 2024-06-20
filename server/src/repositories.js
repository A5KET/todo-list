import { Database } from './database.js'
import { generateToken } from './utils.js'


export class Repository {
  /**
   * 
   * @param {Database} db
   */
  constructor(db) {
    this.db = db
  }
}


export class SessionRepository extends Repository {
  async get(token) {
    return this.db.getSessionByToken(token)
  }

  async update(userId) {
    const token = generateToken()

    return this.db.addSession(userId, token)
  }
}


export class UserRepository extends Repository {
  constructor(db, hashEncryptor) {
    super(db)
    this.hashEncryptor = hashEncryptor
  }

  async get(email, password) {
    password = this.hashEncryptor(password)

    return this.db.getUser(email, password)
  }

  async getByToken(token) {
    return this.db.getUserByToken(token)
  }

  async add(user) {
    user.password = this.hashEncryptor(user.password)
    await this.db.addUser(user)

    return this.db.getUser(user.email, user.password)
  }

  async isUsernameAvailable(username) {
    return this.db.checkIfUsernameInUse(username).then(result => !result)
  }

  async isEmailAvailable(email) {
    return this.db.checkIfEmailInUse(email).then(result => !result)
  }
}


export class TaskRepository extends Repository {
  async getAll(userId) {
    return this.db.getTasks(userId)
  }

  async add(userId, task) {
    task.userId = userId

    return this.db.addTask(task)
  }

  async update(userId, task) {
    task.userId = userId

    return this.db.updateTask(task)
  }

  async remove(userId, taskId) {
    return this.db.removeTask({ id: taskId, userId })
  }
}