import { validate } from 'validate.js'
import { userConstraints } from './constraints.js'


export class Validator {
  validateNewUser(user) {
    return validate(user, newUserConstraints)
  }

  validateUser(user) {
    return validate(user, userConstraints)
  }
}