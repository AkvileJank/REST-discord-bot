import type { Database, Messages } from '@/database'
import { keys } from './schema'

type Row = Messages

export default (db: Database) => ({
  getAll: async () =>
    db
      .selectFrom('messages')
      .leftJoin('templates', 'messages.templateId', 'templates.id')
      .leftJoin('sprints', 'messages.sprintCode', 'sprints.code')
      .select([
        'username',
        'templates.content as template',
        'sprints.title as sprint',
        'createdAt',
      ])
      .execute(),

  getByUser: async (user: string) =>
    db
      .selectFrom('messages')
      .leftJoin('templates', 'messages.templateId', 'templates.id')
      .leftJoin('sprints', 'messages.sprintCode', 'sprints.code')
      .select([
        'username',
        'templates.content as template',
        'sprints.title as sprint',
        'createdAt',
      ])
      .where('username', '=', user)
      .execute(),

  getBySprint: async (sprint: string) =>
    db
      .selectFrom('messages')
      .leftJoin('templates', 'messages.templateId', 'templates.id')
      .leftJoin('sprints', 'messages.sprintCode', 'sprints.code')
      .select([
        'username',
        'templates.content as template',
        'sprints.title as sprint',
        'createdAt',
      ])
      .where('sprintCode', '=', sprint)
      .execute(),

  getBySprintAndUser: async (sprint: string, user: string) =>
    db
      .selectFrom('messages')
      .leftJoin('templates', 'messages.templateId', 'templates.id')
      .leftJoin('sprints', 'messages.sprintCode', 'sprints.code')
      .select([
        'username',
        'templates.content as template',
        'sprints.title as sprint',
      ])
      .where('sprintCode', '=', sprint)
      .where('username', '=', user)
      .executeTakeFirst(),

  create: async (message: Omit<Row, 'createdAt'>) =>
    db
      .insertInto('messages')
      .values(message)
      .returning(keys)
      .executeTakeFirst(),
})
