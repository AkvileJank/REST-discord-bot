import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)

afterEach(async () => {
  await db.deleteFrom('messages').execute()
})

afterAll(() => db.destroy())

describe('GET', () => {
    describe('/', () => {
        it('should return all messages for all learners', async() => {

            messages.loadMessages(db)

            const {body} = await supertest(app).get('/messages').expect(200)
            expect(body).toHaveLength(3)
            expect(body).toEqual(messages.messagesList)
        })
    })
})