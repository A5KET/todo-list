import { validate } from 'validate.js'
import { userConstraints } from './constraints.js'


export class Validator {
  validateUser(user) {
    return validate(user, userConstraints)
  }
}