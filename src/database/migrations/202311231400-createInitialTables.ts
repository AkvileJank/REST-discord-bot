import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('templates')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('content', 'text', (c) => c.notNull())
    .execute()

  await db.schema
    .createTable('sprints')
    .ifNotExists()
    .addColumn('code', 'text', (c) => c.notNull())
    .addColumn('title', 'text', (c) => c.notNull())
    .execute()

  await db.schema
    .createTable('messages')
    .ifNotExists()
    .addColumn('username', 'text', (c) => c.notNull())
    .addColumn('messageId', 'integer', (c) =>
      c.references('messages.id').onDelete('cascade').notNull()
    )
    .addColumn('sprintCode', 'text', (c) =>
      c.references('sprints.code').onDelete('cascade').notNull()
    )
    .execute()
}
