import createTestDatabase from '@tests/utils/createTestDatabase'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('users').execute()
})

describe('getUser', () => {
  it('should return existing user', async () => {
    const testUser = {
      user: 'test1',
    }

    //populate database
    await db.insertInto('users').values(testUser).execute()

    expect(await repository.getUser(testUser.user)).toEqual(testUser)
  })
})

describe('addUser', () => {
  it('should add new user to database', async () => {
    const testUser = {
      user: 'test1',
    }

    const addedUser = await repository.addUser(testUser)
    expect(addedUser).toEqual(testUser)
  })
})
