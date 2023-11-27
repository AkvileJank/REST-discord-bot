import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
//import * as schema from './schema'

export default (db: Database) => {
  const messages = buildRepository(db)
  const router = Router()

  router.route('/').get(
    jsonRoute(async (req) => {
      const username = req.query.username
      const sprint = req.query.sprint

      if (!username && !sprint) {
        return await messages.getAll()
      }
      if (username && typeof username === 'string') {
        return await messages.getByUser(username)
      }

      if (sprint && typeof sprint === 'string') {
        return await messages.getBySprint(sprint)
      }
    })
  )
  return router
}
