import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'
import * as sprints from './utils/loadSprints'

const db = await createTestDatabase()
const app = createApp(db)

afterEach(async () => {
  await db.deleteFrom('sprints').execute()
})

afterAll(() => db.destroy())

describe('GET', () => {
  it('should return all existing sprints', async () => {
    sprints.loadSprints(db)

    const { body } = await supertest(app).get('/sprints').expect(200)
    expect(body).toHaveLength(3)
    expect(body).toEqual(sprints.sprintsList)
  })
})

describe('POST', () => {
  it('should allow to create new sprint', async () => {
    const { body } = await supertest(app)
      .post('/sprints')
      .send({
        code: 'WD-1.1',
        title: 'First sprint',
      })
      .expect(201)
    expect(body).toEqual({
      code: 'WD-1.1',
      title: 'First sprint',
    })
  })
})

describe('PATCH /:code', () => {
  it('should allow updating sprint title', async () => {
    sprints.loadSprints(db)
    const { body } = await supertest(app)
      .patch('/sprints/WD-1.1')
      .send({
        title: 'Updated first sprint title',
      })
      .expect(200)

    expect(body).toEqual({
      code: 'WD-1.1',
      title: 'Updated first sprint title',
    })
  })
})

describe('DELETE /:code', () => {
  it('should delete sprint', async () => {
    sprints.loadSprints(db)

    const { body } = await supertest(app).delete('/sprints/WD-1.1').expect(200)

    expect(body).toEqual({
      code: 'WD-1.1',
      title: 'First sprint',
    })
  })
})
