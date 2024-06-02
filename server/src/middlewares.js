import express from 'express'


/**
 * @callback ExpressMiddleware
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */


/** @type {ExpressMiddleware} */
export async function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ error: 'Authorization denied' })
  }

  const user = req.db.user.getByToken(token)

  if (!user) {
    return res.status(401).json({ error: 'Token is not valid' })
  }

  req.user = user
  next()
}