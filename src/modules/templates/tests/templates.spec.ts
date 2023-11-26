import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'
import * as templates from './utils/loadTemplates'

const db = await createTestDatabase()
const app = createApp(db)

afterEach(async () => {
  await db.deleteFrom('templates').execute()
})

afterAll(() => db.destroy())

describe('GET', () => {
  it('should return a list of templates in the database', async () => {
    templates.loadTemplates(db)

    const { body } = await supertest(app).get('/templates').expect(200)
    expect(body).toHaveLength(3)
    expect(body).toEqual(templates.templatesList)
  })
})

describe('POST', () => {
  it('should add new template to the database', async () => {
    templates.loadTemplates(db)
    const { body } = await supertest(app)
      .post('/templates')
      .send({
        id: 4,
        content: `Congratulations on your remarkable achievement!`,
      })
      .expect(201)

    expect(body).toEqual({
      id: 4,
      content: `Congratulations on your remarkable achievement!`,
    })
  })
})

describe('PATCH /:id', () => {
  it('should allow partial updates', async () => {
    templates.loadTemplates(db)

    const id = 1
    const { body } = await supertest(app)
      .patch(`/templates/${id}`)
      .send({ content: 'Updated congratulations message!' })
      .expect(200)

    expect(body).toEqual({
      id: id,
      content: 'Updated congratulations message!',
    })
  })
})

describe('DELETE /:id', () => {
  it('should delete template by id', async () => {
    templates.loadTemplates(db)

    const { body } = await supertest(app).delete('/templates/1').expect(200)

    expect(body).toEqual({
      id: 1,
      content: 'Congratulations on your well-deserved success!',
    })
  })
})
