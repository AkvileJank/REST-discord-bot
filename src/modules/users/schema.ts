import { z } from 'zod'
import type { Users } from '@/database'

type Record = Users
const schema = z.object({
  user: z.string().min(1).max(10),
})

export const parseUser = (user: unknown) => schema.parse(user)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
