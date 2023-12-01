import type { Updateable } from 'kysely'
import type { Database, Sprints } from '@/database'
import { keys } from './schema'

type Row = Sprints
type RowWithoutCode = Omit<Row, 'code'>
type RowUpdate = Updateable<RowWithoutCode>

export default (db: Database) => ({
  getAll: async () => db.selectFrom('sprints').selectAll().execute(),

  getByCode: async (code: string) =>
    db
      .selectFrom('sprints')
      .selectAll()
      .where('code', '=', code)
      .executeTakeFirst(),

  create: async (record: Row) =>
    db.insertInto('sprints').values(record).returning(keys).executeTakeFirst(),

  update: async (code: string, partial: RowUpdate) =>
    db
      .updateTable('sprints')
      .set(partial)
      .where('code', '=', code)
      .returning(keys)
      .executeTakeFirst(),

  delete: async (code: string) =>
    db
      .deleteFrom('sprints')
      .where('code', '=', code)
      .returning(keys)
      .executeTakeFirst(),
})
