import express from 'express'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'
import {templatesRouting} from './modules/templates/controller'
import sprints from './modules/sprints/controller'
import {messagesRouting} from './modules/messages/controller'
import users from './modules/users/controller'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createApp(db: Database) {
  const app = express()

  app.use(express.json())

  // register your controllers here

  app.use(jsonErrorHandler)
  app.use('/templates', templatesRouting(db))
  app.use('/sprints', sprints(db))
  app.use('/users', users(db))
  app.use('/messages', messagesRouting(db, app))


  return app
}
