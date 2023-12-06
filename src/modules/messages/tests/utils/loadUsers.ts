import type { Database } from '@/database'

export const usersList = [
  {
    user: 'test1',
  },
  {
    user: 'test2',
  },
  {
    user: 'test3',
  },
]

export function loadUsers(db: Database) {
  db.insertInto('users').values(usersList).execute()
}
