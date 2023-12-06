import { config } from 'dotenv'
import { Database } from '@/database'

config()
export default async function seedTables(db: Database) {
  const users = (await db.selectFrom('users').selectAll().execute()).length
  const templates = (await db.selectFrom('templates').selectAll().execute())
    .length
  const sprints = (await db.selectFrom('sprints').selectAll().execute()).length

  if (users === 0 && templates === 0 && sprints === 0) {
    db.insertInto('users').values({ user: 'testUser' }).execute()
    db.insertInto('templates')
      .values({
        content: 'Congratulations on this achievement!',
      })
      .execute()
    db.insertInto('sprints')
      .values({
        code: 'WD-1.1',
        title: 'Introduction to TDD',
      })
      .execute()
  }
}
