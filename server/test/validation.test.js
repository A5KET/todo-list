import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert'

import { Validator } from '../src/validation.js'

import { getNumberOfKeys } from './utils.js'


describe('Validator', function() {
  const validator = new Validator()

  describe('#validateTask', function() {
    let task

    beforeEach(function() {
      task = {
        id: 1234,
        userId: 1234,
        description: 'Task to do',
        isDone: false
      }
    })

    it('returns error if description is too long', function() {
      task.description = '-' * 3000
      const errors = validator.validateTask(task)

      assert.ok('description' in errors)
      assert.strictEqual(getNumberOfKeys(errors), 1)
    })
  })

  describe('#validateNewUser', function() {
    let user

    beforeEach(function() {
      user = {
        username: 'username123',
        email: 'example@gmail.com',
        password: 'Password12345'
      }
    })

    it('returns error if username it too short', function() {
      user.username = 'user'
      const errors = validator.validateNewUser(user)

      assert.ok('username' in errors)
      assert.strictEqual(getNumberOfKeys(errors), 1)
    })

    it('returns error if password doesn\'t have at least one letter', function() {
      user.password = '12345678'
      const errors = validator.validateNewUser(user)

      assert.ok('password' in errors)
      assert.strictEqual(getNumberOfKeys(errors), 1)
    })

    it('returns error if password doesn\'t have at least one digit', function() {
      user.password = 'password'
      const errors = validator.validateNewUser(user)

      assert.ok('password' in errors)
      assert.strictEqual(getNumberOfKeys(errors), 1)
    })

    it('returns error if password is too short', function() {
      user.password = 'p1'
      const errors = validator.validateNewUser(user)

      assert.ok('password' in errors)
      assert.strictEqual(getNumberOfKeys(errors), 1)
    })

    it('returns undefined if user is valid', function() {
      const errors = validator.validateNewUser(user)

      assert.strictEqual(errors, undefined)
    })
  })
})