import express from 'express'

import { router as authRouter } from './routes/auth.js'
import { router as taskRouter } from './routes/task.js'
import { authMiddleware } from './middlewares.js'


export function createApp(database) {
  const app = express()

  app.use('/', authRouter)
  app.use('/', authMiddleware, taskRouter)

  app.use((req, res, next) => {
    req.db = database
    next()
  })

  return app
}