import type { Database, Users } from '@/database'
import { keys } from './schema'

export default (db: Database) => ({
  getUser: async (username: string) =>
    db
      .selectFrom('users')
      .select('user')
      .where('user', '=', username)
      .executeTakeFirst(),

  addUser: async (user: Users) =>
    db.insertInto('users').values(user).returning(keys).executeTakeFirst(),
})
