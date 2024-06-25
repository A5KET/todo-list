import express from 'express'

import { getAnyObjectValue } from '../utils.js'


export const router = express.Router()


router.post('/tasks', (req, res) => {
  const task = req.body
  task.userId = req.user.id
  const validationErrors = req.validation.validateNewTask(task)

  if (validationErrors) {
    return res.status(422).json({ error: getAnyObjectValue(validationErrors) })
  }

  req.db.task.add(task).then(() => res.end())
})


router.get('/tasks', async (req, res) => {
  const userId = req.user.id
  const tasks = await req.db.task.getAll(userId)

  res.json({ data: tasks })
})


router.put('/tasks/:taskId', (req, res) => {
  const task = req.body
  task.id = Number(req.params.taskId)
  task.userId = req.user.id
  const validationErrors = req.validation.validateTask(task)

  if (validationErrors) {
    return res.status(422).json({ error: getAnyObjectValue(validationErrors) })
  }

  req.db.task.update(task).then(() => res.end())
})


router.delete('/tasks/:taskId', (req, res) => {
  const taskInfo = {
    id: req.params.taskId,
    userId: req.user.id
  }

  req.db.task.remove(taskInfo).then(() => res.end())
})