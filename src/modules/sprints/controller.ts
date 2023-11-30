import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import * as schema from './schema'
import { StatusCodes } from 'http-status-codes'

export default (db: Database) => {
  const sprints = buildRepository(db)
  const router = Router()

  router
    .route('/')
    .get(
      jsonRoute(async () => {
        return await sprints.getAll()
      })
    )
    .post(
      jsonRoute(async (req) => {
        const body = schema.parseInsertable(req.body)
        return sprints.create(body)
      }, StatusCodes.CREATED)
    )

  router
    .route('/:code')
    .patch(
      jsonRoute(async (req) => {
        const code = schema.parseCode(req.params.code)
        const bodyPatch = schema.parseUpdatabale(req.body)
        const record = await sprints.update(code, bodyPatch)

        // if (!record) {
        //   throw new notFound();
        // }
        return record
      })
    )
    .delete(
      jsonRoute(async (req) => {
        const code = schema.parseCode(req.params.code)
        const record = await sprints.delete(code)
        return record
      })
    )
  return router
}
