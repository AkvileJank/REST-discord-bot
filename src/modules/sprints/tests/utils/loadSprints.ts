import type { Database } from '@/database'

export const sprintsList = [
  {
    code: 'WD-1.1',
    title: 'First sprint',
  },
  {
    code: 'WD-1.2',
    title: 'Second sprint',
  },
  {
    code: 'WD-1.3',
    title: 'Third sprint',
  },
]

export function loadSprints(db: Database) {
  return db.insertInto('sprints').values(sprintsList).execute()
}
