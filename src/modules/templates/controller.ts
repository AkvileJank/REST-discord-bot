import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import * as schema from './schema'
import { TemplateNotFound } from './errors'

export function templatesRouting(db: Database) {
  const templates = buildRepository(db)
  const router = Router()

  router
    .route('/')
    .get(jsonRoute(async () => templates.getAll()))
    .post(
      jsonRoute(async (req) => {
        const body = schema.parseInsertable(req.body)
        return templates.create(body)
      }, StatusCodes.CREATED)
    )

  router
    .route('/:id')
    .get(
      jsonRoute(async (req) => {
        const id = schema.parseId(req.params.id)
        const record = await templates.getById(id)
        if (!record) {
          throw new TemplateNotFound()
        }
        return record
      })
    )
    .patch(
      jsonRoute(async (req) => {
        const id = schema.parseId(req.params.id)
        const bodyPatch = schema.parseInsertable(req.body)
        const record = await templates.update(id, bodyPatch)

        if (!record) {
          throw new TemplateNotFound()
        }
        return record
      })
    )
    .delete(
      jsonRoute(async (req) => {
        const id = schema.parseId(req.params.id)
        const record = await templates.delete(id)
        if (!record) {
          throw new TemplateNotFound()
        }
        return record
      })
    )
  return router
}
