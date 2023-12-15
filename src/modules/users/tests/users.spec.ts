import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)

afterEach(async () => {
  await db.deleteFrom('users').execute()
})

afterAll(() => db.destroy())

describe('POST', () => {
  it('should add new user', async () => {
    const testUser = {
      user: 'test1',
    }
    const { body } = await supertest(app)
      .post('/users')
      .send(testUser)
      .expect(201)
    expect(body).toEqual({
      user: 'test1',
    })
  })
})

it('should throw error if no user is provided', async () => {
  const testUser = {}
  await supertest(app).post('/users').send(testUser).expect(400)
})
