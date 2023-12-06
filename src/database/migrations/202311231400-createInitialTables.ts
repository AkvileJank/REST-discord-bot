import { Kysely, SqliteDatabase, sql } from 'kysely'

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
    .addColumn('code', 'text', (c) => c.notNull().primaryKey())
    .addColumn('title', 'text', (c) => c.notNull())
    .execute()

  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('user', 'text', (c) => c.notNull().primaryKey())
    .execute()

  await db.schema
    .createTable('messages')
    .ifNotExists()
    .addColumn('username', 'text', (c) =>
      c.references('users.user').onDelete('cascade').notNull()
    )
    .addColumn('template_id', 'integer', (c) =>
      c.references('templates.id').onDelete('cascade').notNull()
    )
    .addColumn('sprint_code', 'text', (c) =>
      c.references('sprints.code').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'datetime', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute()
}
