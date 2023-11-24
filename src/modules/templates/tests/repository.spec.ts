import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'
import * as templates from './utils/loadTemplates'

const db = await createTestDatabase()
const repository = buildRepository(db)

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('templates').execute()
})

describe('getAll', () => {
  it('should return all templates', async () => {
    templates.loadTemplates(db)
    const foundTemplates = await repository.getAll()
    expect(foundTemplates).toHaveLength(3)
  })
})

describe('create', () => {
  it('should add new template to database', async () => {
    const template = {
      id: 1,
      content: 'New message template',
    }

    const addedTemplate = await repository.create(template)
    expect(addedTemplate).toEqual(template)
  })
})

describe('update', () => {
  it('should update content', async () => {
    templates.loadTemplates(db)
    const id = 1
    const updatedTemplate = await repository.update(id, {
      content: 'Updated template',
    })

    expect(updatedTemplate).toMatchObject({
      id: 1,
      content: 'Updated template',
    })
  })
})

describe('delete', () => {
  it('should delete template', async () => {
    templates.loadTemplates(db)

    const id = 1
    const deletedTemplate = await repository.delete(id)

    expect(deletedTemplate).toEqual({
      id: 1,
      content: 'Congratulations on your well-deserved success!',
    })
  })
})
