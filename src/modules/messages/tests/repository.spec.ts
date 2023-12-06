import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'
import * as messages from './utils/loadMessages'
import { loadSprints } from '@/modules/sprints/tests/utils/loadSprints'
import { loadTemplates } from '@/modules/templates/tests/utils/loadTemplates'
import { loadUsers } from './utils/loadUsers'

const db = await createTestDatabase()
const repository = buildRepository(db)

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('sprints').execute()
  await db.deleteFrom('templates').execute()
  await db.deleteFrom('messages').execute()
  await db.deleteFrom('users').execute()
})

describe('getAll', () => {
  it('should return all messages', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const foundMessages = await repository.getAll()
    const expectedMessages = [
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
    ]

    // Exclude createdAt from the assertion
    const sanitizeObject = ({ createdAt, ...rest }) => rest
    const sanitizedFoundMessages = foundMessages.map(sanitizeObject)
    const sanitizedExpectedMessages = expectedMessages.map(sanitizeObject)

    expect(sanitizedFoundMessages).toEqual(sanitizedExpectedMessages)
  })
})

describe('getByUser', () => {
  it('should return messages for specific user', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const user = 'test1'
    const userMessages = await repository.getByUser(user)

    const expectedUserMessages = [
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
    ]

    // Exclude createdAt from the assertion
    const sanitizeObject = ({ createdAt, ...rest }) => rest
    const sanitizedUserMessages = userMessages.map(sanitizeObject)
    const sanitizedExpectedUserMessages =
      expectedUserMessages.map(sanitizeObject)

    expect(sanitizedUserMessages).toEqual(sanitizedExpectedUserMessages)
  })
})

describe('getBySprint', () => {
  it('should return messages for specific sprint', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const sprint = 'WD-1.1'
    const sprintMessages = await repository.getBySprint(sprint)

    const expectedSprintMessages = [
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
    ]

    // Exclude createdAt from the assertion
    const sanitizeObject = ({ createdAt, ...rest }) => rest
    const sanitizedSprintMessages = sprintMessages.map(sanitizeObject)
    const sanitizedExpectedSprintMessages =
      expectedSprintMessages.map(sanitizeObject)

    expect(sanitizedSprintMessages).toEqual(sanitizedExpectedSprintMessages)
  })
})

describe('create', () => {
  it('should add a new message to the database', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const message = {
      sprintCode: 'WD-1.1',
      templateId: 1,
      username: 'test1',
    }

    const addedMessage = await repository.create(message)

    // Exclude createdAt from the assertion
    const { createdAt, ...restOfAddedMessage } = addedMessage
    const { createdAt: expectedCreatedAt, ...restOfExpectedMessage } = message

    // Check the remaining properties
    expect(restOfAddedMessage).toEqual(restOfExpectedMessage)
  })
})
