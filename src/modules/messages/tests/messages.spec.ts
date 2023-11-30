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
      expect(body).toHaveLength(3)
      expect(body).toEqual([
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
})

describe('GET by username', () => {
  it('should return messages for specific learner', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const { body } = await supertest(app)
      .get('/messages?username=test1')
      .expect(200)

    expect(body).toHaveLength(1)
    expect(body).toEqual([
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
    ])
  })
})

describe('GET by sprint', () => {
  it('should return messages for specific sprint', async () => {
    loadSprints(db)
    loadTemplates(db)
    loadUsers(db)
    messages.loadMessages(db)

    const { body } = await supertest(app)
      .get('/messages?sprint=WD-1.1')
      .expect(200)

    expect(body).toHaveLength(1)
    expect(body).toEqual([
      {
        username: 'test1',
        template: 'Congratulations on your well-deserved success!',
        sprint: 'First sprint',
      },
    ])
  })
})

describe('POST', () => {
  it('should post a print new message', async () => {
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
})
