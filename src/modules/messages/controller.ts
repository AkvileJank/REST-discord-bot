import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import randomTemplate from '../templates/utils'
import { postToDiscord } from './discord'

//import * as schema from './schema'

export function messagesRouting(db: Database) {
  const messages = buildRepository(db)
  const router = Router()

  router
    .route('/')
    .get(
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
    .post(
      jsonRoute(async (req) => {
        const { sprintCode, username } = req.body
        // need to verify if sprintCode and username exists in the database

        const template = await randomTemplate(db)

        // to add message to database - move else
        const messageToDb = {
          sprintCode: sprintCode,
          templateId: template.id,
          username: username,
        }

        // adds generated message to database
        await messages.create(messageToDb)

        // to get object with template content also
        const messageObj = await messages.getBySprintAndUser(
          sprintCode,
          username
        )

        // const messageObj = {
        //   sprint: 'Introduction',
        //   username: 'akvi111',
        //   template: 'Congratulations!',
        // }
        const formedMessage = `has just completed ${messageObj?.sprint}! ${messageObj?.template}`

        await postToDiscord(username, formedMessage)
      })
    )

  return router
}
