import pg from 'pg'

import { Database } from './src/database.js'
import { SessionService, TaskService, UserService } from './src/services.js'
import { createApp } from './src/app.js'
import { SHA256HexEncryptor } from './src/hash.js'
import { Validator } from './src/validation.js'


async function start() {
  const PORT = 3000
  const client = new pg.Client({ connectionString: process.env.PGSTRING})
  const database = new Database(client)
  const validator = new Validator()

  const services = {
    user: new UserService(database, SHA256HexEncryptor),
    session: new SessionService(database),
    task: new TaskService(database)
  }

  const app = createApp(services, validator)

  await client.connect()
  await database.createTables()

  process.on('exit', async () => {
    await client.end()
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}


start()