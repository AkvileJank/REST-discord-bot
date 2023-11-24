import type { Database } from '@/database'

export const templatesList = [
  {
    id: 1,
    content: 'Congratulations on your well-deserved success!',
  },
  {
    id: 2,
    content:
      'Your achievement is a testament to your perseverance and commitment!',
  },
  {
    id: 3,
    content:
      'Heartfelt congratulations on reaching this significant milestone!',
  },
]

export function loadTemplates(db: Database) {
  db.insertInto('templates').values(templatesList).execute()
}
