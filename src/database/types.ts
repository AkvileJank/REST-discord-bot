import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export interface Messages {
  username: string
  templateId: number
  sprintCode: string
  createdAt: Generated<string>
}

export interface Sprints {
  code: string
  title: string
}

export interface Templates {
  id: Generated<number>
  content: string
}

export interface Users {
  user: string
}

export interface DB {
  messages: Messages
  sprints: Sprints
  templates: Templates
  users: Users
}
