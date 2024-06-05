import express from 'express'


export const router = express.Router()


router.post('/tasks', (req, res) => {
  const task = req.body
  const userId = req.user.id

  req.db.task.add(userId, task).then(() => res.end())
})


router.get('/tasks', (req, res) => {
  const userId = req.user.id

  req.db.task.getAll(userId).then((tasks) => res.json({ data: tasks }))
})


router.put('/tasks/:taskId', (req, res) => {
  const task = req.body
  const taskId = req.params.taskId
  task.id = taskId
  
  const userId = req.user.id

  req.db.task.update(userId, task).then(() => res.end())
})


router.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const userId = req.user.id

  req.db.task.remove(userId, taskId).then(() => res.end())
})