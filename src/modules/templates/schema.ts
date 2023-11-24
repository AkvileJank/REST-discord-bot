import { z } from 'zod'
import type { Templates } from '@/database'

type Record = Templates
const schema = z.object({
  id: z.coerce.number().int().positive(),
  content: z.string().min(1).max(1000),
})

const insertable = schema.omit({
  id: true,
})

export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
