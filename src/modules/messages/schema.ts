import { z } from 'zod'
import type { Messages} from '@/database'

type Record = Messages
const schema = z.object({
  username: z.string().length(6), // in turing college
  templateId: z.coerce.number().positive().int(),
  sprintCode: z.string().min(1).max(10)

})

export const parseUser = (user: unknown) => schema.shape.username.parse(user)
export const parseSprint = (sprint: unknown) => schema.shape.sprintCode.parse(sprint)

// Not sure how to use schema for query params validation?

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
