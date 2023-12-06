import type { Database } from '@/database'

export const messagesList = [
  {
    username: 'test1',
    templateId: 1,
    sprintCode: 'WD-1.1',
  },
  {
    username: 'test2',
    templateId: 2,
    sprintCode: 'WD-1.2',
  },
  {
    username: 'test3',
    templateId: 3,
    sprintCode: 'WD-1.3',
  },
]

export function loadMessages(db: Database) {
  db.insertInto('messages').values(messagesList).execute()
}
