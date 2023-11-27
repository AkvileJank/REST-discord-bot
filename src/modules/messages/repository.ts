import type { Database } from '@/database'

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
      ])
      .where('sprintCode', '=', sprint)
      .execute(),
})
