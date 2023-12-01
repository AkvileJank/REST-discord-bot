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
it('should return an empty list if no templates were found', async () => {
  const { body } = await supertest(app).get('/templates').expect(200)
  expect(body).toHaveLength(0)
  expect(body).toEqual([])
})

describe('GET /:id', () => {
  it('should return a template by id', async () => {
    templates.loadTemplates(db)

    const { body } = await supertest(app).get('/templates/1').expect(200)
    expect(body).toEqual(templates.templatesList[0])
  })
  it('should return error if template is not found', async () => {
    templates.loadTemplates(db)
    await supertest(app).get('/templates/111').expect(404)
  })
})

describe('POST', () => {
  it('should add new template to the database', async () => {
    templates.loadTemplates(db)
    const testTemplate = {
      content: `Congratulations on your remarkable achievement!`,
    }
    const { body } = await supertest(app)
      .post('/templates')
      .send(testTemplate)
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
    const updatedTemplate = 'Updated congratulations message!'
    const { body } = await supertest(app)
      .patch(`/templates/${id}`)
      .send({ content: updatedTemplate })
      .expect(200)

    expect(body).toEqual({
      id,
      content: updatedTemplate,
    })
  })
  it('should return error if template is not found', async () => {
    templates.loadTemplates(db)
    await supertest(app)
      .patch('/templates/111')
      .send({
        content: 'Updated',
      })
      .expect(404)
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
  it('should return error if template is not found', async () => {
    templates.loadTemplates(db)
    await supertest(app).delete('/templates/111').expect(404)
  })
})
