import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'
import * as messages from './utils/loadMessages'
import { loadSprints } from '@/modules/sprints/tests/utils/loadSprints'
import { loadTemplates } from '@/modules/templates/tests/utils/loadTemplates'
import { loadUsers } from './utils/loadUsers'

const db = await createTestDatabase()
const app = createApp(db)

afterEach(async () => {
  await db.deleteFrom('templates').execute()
  await db.deleteFrom('sprints').execute()
  await db.deleteFrom('users').execute()
  await db.deleteFrom('messages').execute()
})

afterAll(() => db.destroy())

describe('GET', () => {
  describe('/', () => {
    it('should return messages for all learners', async () => {
      loadSprints(db)
      loadTemplates(db)
      loadUsers(db)
      messages.loadMessages(db)

      const { body } = await supertest(app).get('/messages').expect(200)
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
      const sanitizedBody = body.map(sanitizeObject)
      const sanitizedExpected = expectedMessages.map(sanitizeObject)

      expect(sanitizedBody).toEqual(sanitizedExpected)
    })
  })
})

describe('GET by username', () => {
  it('should return messages for a specific learner', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const { body } = await supertest(app)
      .get('/messages?username=test1')
      .expect(200)

    const expectedMessage = {
      username: 'test1',
      template: 'Congratulations on your well-deserved success!',
      sprint: 'First sprint',
    }

    // Exclude createdAt from the assertion
    const sanitizeObject = ({ createdAt, ...rest }) => rest
    const sanitizedActual = sanitizeObject(body[0])
    const sanitizedExpected = sanitizeObject(expectedMessage)

    expect(sanitizedActual).toEqual(sanitizedExpected)
  })
})

describe('GET by sprint', () => {
  it('should return messages for a specific sprint', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const { body } = await supertest(app)
      .get('/messages?sprint=WD-1.1')
      .expect(200)

    const expectedMessage = {
      username: 'test1',
      template: 'Congratulations on your well-deserved success!',
      sprint: 'First sprint',
    }

    // Exclude createdAt from the assertion
    const sanitizeObject = ({ createdAt, ...rest }) => rest
    const sanitizedActual = sanitizeObject(body[0])
    const sanitizedExpected = sanitizeObject(expectedMessage)

    expect(sanitizedActual).toEqual(sanitizedExpected)
  })
})

describe('POST', () => {
  it('should post a new message', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)

    const messageTest = {
      sprintCode: 'WD-1.1',
      username: 'test1',
    }
    const { body } = await supertest(app)
      .post('/messages')
      .send(messageTest)
      .expect(201)
    expect(body).toEqual('Message fragment was prepared for discord')
  })

  it('should throw error if provided user is not in database', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)

    const messageTest = {
      sprintCode: 'WD-1.1',
      username: 'user',
    }
    await supertest(app).post('/messages').send(messageTest).expect(400)
  })

  it('should throw error if provided sprint code is not in database', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)

    const messageTest = {
      sprintCode: 'test',
      username: 'test1',
    }
    await supertest(app).post('/messages').send(messageTest).expect(400)
  })

  it('should throw error if sprint and user are both not in database', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    const messageTest = {
      sprintCode: 'a',
      username: 'b',
    }
    await supertest(app).post('/messages').send(messageTest).expect(400)
  })

  it('should throw error if no sprint code and username is provided', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    await supertest(app).post('/messages').send().expect(400)
  })
})
