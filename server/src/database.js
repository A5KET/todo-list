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
      username VARCHAR(256) NOT NULL,
      email VARCHAR(256) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS task (
      id SERIAL PRIMARY KEY,
      user_id SERIAL REFERENCES "user" (id),
      text VARCHAR(2048) NOT NULL,
      is_done BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS session (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES "user" (id) UNIQUE,
      token VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `)
  }

  executeSelectOne(query, values) {
    this.client.executeSelectMany(query, values).then(result => result[0])
  }

  executeSelectMany(query, values) {
    this.client.query(query, values).then(result => result.rows).then(rows => this.handlerResultRows(rows))
  }

  handlerResultRows(rows) {
    rows.forEach(renameObjectPropertiesFromSnakeCaseToCamelCase)

    return rows
  }

  getAll(table) {
    return this.executeSelectMany(`
      SELECT *
      FROM "${table}"
    `)
  }

  getUser(email, password) { 
    return this.executeSelectOne(`
      SELECT (id, username, email)
      FROM "user"
      WHERE email = $1 AND password = $2
    `, [email, password])
  }

  addUser(user) {
    return this.executeSelectOne(`
      INSERT INTO "user" (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING (id, username, email)
    `, [user.username, user.email, password])
  }

  getTasks(userId) {
    return this.executeSelectMany(`
      SELECT *
      FROM "task"
      WHERE user_id = $1
    `, [userId])
  }

  getUserByToken(token) {
    return this.executeSelectOne(`
      SELECT (id, username, email)
      FROM "user"
      JOIN session ON session.token = $1
    `, [token])
  }

  getSessionByToken(token) {
    return this.executeSelectOne(`
      SELECT *
      FROM session
      WHERE session.token = $1
    `, [token])
  }

  addSession(userId, token) {
    return this.executeSelectOne(`
      INSERT INTO session (user_id, token)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET token = $2, created_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, token])
  }

  addTask(task) {
    return this.query(`
      INSERT INTO task (user_id, text, is_done)
      VALUES ($1, $2, $3)
    `, [task.userId, task.text, task.isDone])
  }

  updateTask(task) {
    return this.query(`
      UPDATE task
      SET text = $1, is_done = $2
      WHERE task.id = $3
    `, [task.text, task.isDone, task.id])
  }

  removeTask(task) {
    return this.query(`
      DELETE FROM task
      WHERE task.id = $1
    `, [task.id])
  }
}