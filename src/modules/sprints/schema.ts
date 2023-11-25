import { z } from 'zod'
import type { Sprints } from '@/database'

type Record = Sprints
const schema = z.object({
  code: z.string().min(1).max(10),
  title: z.string().min(1).max(1000),
})

const updatable = schema.omit({
  code: true,
})

export const parseCode = (code: unknown) => schema.shape.code.parse(code)
export const parseInsertable = (record: unknown) => schema.parse(record)
export const parseUpdatabale = (record: unknown) => updatable.parse(record)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
