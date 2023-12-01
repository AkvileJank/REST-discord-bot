import { z } from 'zod'
import type { Messages } from '@/database'

type Record = Messages
const schema = z.object({
  username: z.string().min(1).max(10), // in turing college
  templateId: z.coerce.number().positive().int(),
  sprintCode: z.string().min(1).max(10),
})

export const parseUsername = (username: unknown) =>
  schema.shape.username.parse(username)
export const parseSprintCode = (code: unknown) =>
  schema.shape.sprintCode.parse(code)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
