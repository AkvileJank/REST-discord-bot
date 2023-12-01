import sprintsRepo from '../sprints/repository'
import usersRepo from '../users/repository'
import type { Database } from '@/database'
import * as schema from './schema'
import BadRequest from '@/utils/errors/BadRequest'

export async function validateReq(
  sprintCodeInput: unknown,
  usernameInput: unknown,
  db: Database
) {
  // try {
  //   const userInputParsed = schema.parseUsername(usernameInput)
  //   const sprintInputParsed = schema.parseSprintCode(sprintCodeInput)
  // } catch {
  //   throw new BadRequest('Provided username or sprintCode are not valid')
  // }

  const { userInputParsed, sprintInputParsed } = validateUserAndSprint(
    usernameInput,
    sprintCodeInput
  )

  const sprints = sprintsRepo(db)
  const users = usersRepo(db)

  const sprint = await sprints.getByCode(sprintInputParsed)
  const user = await users.getUser(userInputParsed)

  if (user && sprint) {
    return {
      username: user.user,
      sprintCode: sprint.code,
    }
  }

  throw new BadRequest('Provided user or sprint are not found in the database')
}

function validateUserAndSprint(userInput: unknown, sprintInput: unknown) {
  try {
    const userInputParsed = schema.parseUsername(userInput)
    const sprintInputParsed = schema.parseSprintCode(sprintInput)
    return { userInputParsed, sprintInputParsed }
  } catch {
    throw new BadRequest('Provided username or sprintCode are not valid')
  }
}
