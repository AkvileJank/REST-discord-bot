import type {Database} from '@/database'

export default (db: Database) => ({
    getAll: async () => db.selectFrom('messages').selectAll().execute()
})