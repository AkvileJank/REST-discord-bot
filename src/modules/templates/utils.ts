import buildRepository from './repository'
import type { Database } from '@/database'

export default async (db: Database) => {
  const templates = buildRepository(db)
  const allTemplates = await templates.getAll()
  return getRandomTemplate(allTemplates)
}

function getRandomTemplate(allTemplates) {
  const randomIndex = Math.floor(Math.random() * allTemplates.length)
  return allTemplates[randomIndex]
}
