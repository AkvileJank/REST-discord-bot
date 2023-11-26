import express from 'express'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'
import templates from './modules/templates/controller'
import sprints from './modules/sprints/controller'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createApp(db: Database) {
  const app = express()

  app.use(express.json())

  // register your controllers here

  app.use(jsonErrorHandler)
  app.use('/templates', templates(db))
  app.use('/sprints', sprints(db))

  return app
}
