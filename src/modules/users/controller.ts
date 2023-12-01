import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import * as schema from './schema'
import { StatusCodes } from 'http-status-codes'
import BadRequest from '@/utils/errors/BadRequest'

export default (db: Database) => {
  const users = buildRepository(db)
  const router = Router()

  router.post(
    '/',
    jsonRoute(async (req) => {
      const user = schema.parseUser(req.body)
      return users.addUser(user)
    }, StatusCodes.CREATED)
  )
  return router
}
