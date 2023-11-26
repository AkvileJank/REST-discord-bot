import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'
// import fixtures for loading messages table
//(need to load also to sprints and users table, as they are parent keys)

const db = await createTestDatabase()
const repository = buildRepository(db)

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('sprints').execute()
})

describe('getAll', () => {
  it('should return all messages', async () => {
    // messages.loadMessages(db)
    const foundMessages = await repository.getAll()
    expect(foundMessages).toHaveLength(3)
  })
})
