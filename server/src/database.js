import pg from 'pg'

import { renameObjectPropertiesFromSnakeCaseToCamelCase } from './utils.js'


export class Database {
  /**
   * 
   * @param {pg.Client} client 
   */
  constructor(client) {
    this.client = client
  }

  createTables() {
    return this.client.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      username VARCHAR(256) NOT NULL UNIQUE,
      email VARCHAR(256) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS task (
      id SERIAL PRIMARY KEY,
      user_id SERIAL NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
      description VARCHAR(2048) NOT NULL,
      is_done BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS session (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES "user" (id) ON DELETE CASCADE UNIQUE,
      token VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `)
  }

  executeOne(query, values) {
    return this.executeMany(query, values).then(result => result[0])
  }

  executeMany(query, values) {
    return this.client.query(query, values)
      .then(result => result.rows.map(this.handleResultRow))
  }

  executeExists(query, values) {
    return this.executeOne(query, values).then(result => result.exists)
  }

  handleResultRow(row) {
    renameObjectPropertiesFromSnakeCaseToCamelCase(row)

    return row
  }

  getAll(table) {
    return this.executeMany(`
      SELECT *
      FROM "${table}"
    `)
  }

  getUser(email, password) {
    return this.executeOne(`
      SELECT *
      FROM "user"
      WHERE email = $1 AND password = $2
    `, [email, password])
  }

  addUser(user) {
    return this.executeOne(`
      INSERT INTO "user" (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING (id, username, email)
    `, [user.username, user.email, user.password])
  }

  getTasks(userId) {
    return this.executeMany(`
      SELECT *
      FROM "task"
      WHERE user_id = $1
    `, [userId])
  }

  getUserByToken(token) {
    return this.executeOne(`
      SELECT "user".*
      FROM "user"
      JOIN session ON session.token = $1
    `, [token])
  }

  getSessionByToken(token) {
    return this.executeOne(`
      SELECT *
      FROM session
      WHERE session.token = $1
    `, [token])
  }

  addSession(userId, token) {
    return this.executeOne(`
      INSERT INTO session (user_id, token)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET token = $2, created_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, token])
  }

  addTask(task) {
    return this.client.query(`
      INSERT INTO task (user_id, description, is_done)
      VALUES ($1, $2, $3)
    `, [task.userId, task.description, task.isDone])
  }

  updateTask(task) {
    return this.client.query(`
      UPDATE task
      SET description = $1, is_done = $2
      WHERE task.id = $3 AND user_id = $4
    `, [task.description, task.isDone, task.id, task.userId])
  }

  removeTask(task) {
    return this.executeOne(`
      DELETE FROM task
      WHERE task.id = $1 AND user_id = $2
    `, [task.id, task.userId])
  }

  checkIfEmailInUse(email) {
    return this.executeExists(`
      SELECT EXISTS (SELECT 1 FROM "user" WHERE email = $1)
    `, [email])
  }

  checkIfUsernameInUse(username) {
    return this.executeExists(`
        SELECT EXISTS (SELECT 1 FROM "user" WHERE username = $1)
      `, [username])
  }
}