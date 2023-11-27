import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'
import * as messages from './utils/loadMessages'
import { loadSprints } from '@/modules/sprints/tests/utils/loadSprints'
import { loadTemplates } from '@/modules/templates/tests/utils/loadTemplates'

const db = await createTestDatabase()
const repository = buildRepository(db)

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('sprints').execute()
  await db.deleteFrom('templates').execute()
  await db.deleteFrom('messages').execute()
})

describe('getAll', () => {
  it('should return all messages', async () => {
    loadSprints(db)
    loadTemplates(db)
    messages.loadMessages(db)

    const foundMessages = await repository.getAll()
    expect(foundMessages).toHaveLength(3)
    expect(foundMessages).toEqual([
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
      {
        username: 'test2',
        template:
          'Your achievement is a testament to your perseverance and commitment!',
        sprint: 'Second sprint',
      },
      {
        username: 'test3',
        template:
          'Heartfelt congratulations on reaching this significant milestone!',
        sprint: 'Third sprint',
      },
    ])
  })
})

describe('getByUser', () => {
  it('should return messages for specific user', async () => {
    loadSprints(db)
    loadTemplates(db)
    messages.loadMessages(db)

    const user = 'test1'
    const userMessages = await repository.getByUser(user)
    expect(userMessages).toHaveLength(1)
    expect(userMessages).toEqual([
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
    ])
  })
})

describe('getBySprint', () => {
  it('should return messages for specific sprint', async () => {
    loadSprints(db)
    loadTemplates(db)
    messages.loadMessages(db)

    const sprint = 'WD-1.1'
    const sprintMessages = await repository.getBySprint(sprint)
    expect(sprintMessages).toHaveLength(1)
    expect(sprintMessages).toEqual([
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
    ])
  })
})
