import type { Database, Templates } from '@/database'
import { keys } from './schema'
import type { Insertable } from 'kysely'

type Row = Templates
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  getAll: async () => db.selectFrom('templates').selectAll().execute(),
  getById: async (id: number) =>
    db
      .selectFrom('templates')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst(),
  create: async (record: RowInsert) =>
    db
      .insertInto('templates')
      .values(record)
      .returning(keys)
      .executeTakeFirst(),

  update: async (id: number, partial: RowInsert) =>
    db
      .updateTable('templates')
      .set(partial)
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst(),

  delete: async (id: number) =>
    db
      .deleteFrom('templates')
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst(),
})
