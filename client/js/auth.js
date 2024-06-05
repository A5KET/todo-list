import { getObjectFromLocalStorage, removeValueFromLocalStorage, saveObjectIntoLocalStorage } from './utils.js'


export class ValidationError extends Error {
  
}


export class UserInfo {
  constructor(api) {
    this.storageKey = 'userAuthInfo'
    this.api = api
    this.user = getObjectFromLocalStorage(this.storageKey) || undefined
  }

  async get() {
    return this.user
  }

  async signUp(body) {
    if (body.password !== body.confirmPassword) {
      throw new ValidationError('Passwords should match')
    }

    delete body.confirmPassword

    const {token, user} = await this.api.post('/signup', body)
    await this.saveUserInfo(user, token)

    return this.get()
  }

  async signIn(body) {
    const {token, user} = await this.api.post('/signin', body)
    await this.saveUserInfo(user, token)

    return this.get()
  }

  async signOut() {
    await this.removeUserInfo()

    return this.get()
  }

  async saveUserInfo(user, token) {
    user.token = token
    this.user = user
    this.save()
  } 

  save() {
    saveObjectIntoLocalStorage(this.storageKey, this.user)
  }

  async removeUserInfo() {
    this.user = undefined
    removeValueFromLocalStorage(this.storageKey)
  }
}