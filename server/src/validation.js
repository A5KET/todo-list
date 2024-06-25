import { validate } from 'validate.js'
import { taskConstraints, newUserConstraints, userConstraints, newTaskConstraints } from './constraints.js'


export class Validator {
  validateNewTask(task) {
    return validate(task, newTaskConstraints)
  }

  validateTask(task) {
    return validate(task, taskConstraints)
  }

  validateNewUser(user) {
    return validate(user, newUserConstraints)
  }

  validateUser(user) {
    return validate(user, userConstraints)
  }
}