import express from 'express'

import { areDefined } from '../utils.js'


export const router = express.Router()


router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body

  if (!areDefined(email, username, password)) {
    return res.status(400).json({ error: 'Email, username and password are required' })
  }

  const userData = { email, username, password }

  const user = await req.db.user.add(userData)
  const session = await req.db.session.update(user.id)

  req.status(201).json({ data: { token: session.token, user: { username: user.username } } })
})


router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!areDefined(email, password)) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await req.db.user.get(email, password)

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const session = await req.db.session.update(user.id)

  res.json({ data: { token: session.token, user: { username: user.username } } })
})