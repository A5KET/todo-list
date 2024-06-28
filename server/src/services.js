import { Database } from './database.js'
import { generateToken } from './utils.js'


export class Service {
  /**
   * 
   * @param {Database} db
   */
  constructor(db) {
    this.db = db
  }
}


export class SessionService extends Service {
  async get(token) {
    return this.db.getSessionByToken(token)
  }

  async update(userId) {
    const token = generateToken()

    return this.db.addSession(userId, token)
  }
}


export class UserService extends Service {
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


export class TaskRepository extends Service {
  async getAll(userId) {
    return this.db.getTasks(userId)
  }

  async add(task) {
    return this.db.addTask(task)
  }

  async update(task) {
    return this.db.updateTask(task)
  }

  async remove(task) {
    return this.db.removeTask(task)
  }
}