import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'
import * as sprints from './utils/loadSprints'

const db = await createTestDatabase()
const repository = buildRepository(db)

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('sprints').execute()
})

describe('getAll', () => {
  it('should return all sprints', async () => {
    sprints.loadSprints(db)
    const foundSprints = await repository.getAll()
    expect(foundSprints).toHaveLength(3)
  })
})

describe('create', () => {
  it('should add new sprint to database', async () => {
    const sprint = {
      code: 'WD-1.1',
      title: 'First sprint',
    }

    const addedSprint = await repository.create(sprint)
    expect(addedSprint).toEqual(sprint)
  })
})

describe('update', () => {
  it('should update title', async () => {
    sprints.loadSprints(db)
    const code = 'WD-1.1'
    const updatedSprint = await repository.update(code, {
      title: 'Updated first sprint title',
    })

    expect(updatedSprint).toMatchObject({
      code: 'WD-1.1',
      title: 'Updated first sprint title',
    })
  })
})

describe('delete', () => {
  it('should delete sprint', async () => {
    sprints.loadSprints(db)

    const code = 'WD-1.1'
    const deletedSprint = await repository.delete(code)

    expect(deletedSprint).toEqual({
        code: 'WD-1.1',
        title: 'First sprint',
    })
  })
})