import express from 'express'

import { areDefined, getAnyObjectValue } from '../utils.js'


export const router = express.Router()


router.post('/signup', async (req, res) => {
  const validationErrors = req.validation.validateNewUser(userData)

  if (validationErrors) {
    return res.status(422).json({ error: getAnyObjectValue(validationErrors) })
  }

  const { email, username, password } = req.body
  const userData = { email, username, password }
  const userRepository = req.db.user

  if (!(await userRepository.isEmailAvailable(email))) {
    return res.status(422).json({ error: 'Email is already taken' })
  }

  if (!(await userRepository.isUsernameAvailable(username))) {
    return res.status(422).json({ error: 'Username is already taken' })
  }

  const user = await userRepository.add(userData)
  const session = await req.db.session.update(user.id)

  res.status(201).json({ data: { token: session.token, user: { username: user.username } } })
})


router.post('/signin', async (req, res) => {
  const validationErrors = req.validation.validateUser(req.body)

  if (validationErrors) {
    return res.status(422).json({ error: getAnyObjectValue(validationErrors) })
  }

  const { email, password } = req.body

  if (!areDefined(email, password)) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await req.db.user.get(email, password)

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const session = await req.db.session.update(user.id)

  res.json({ data: { token: session.token, user: { username: user.username } } })
})