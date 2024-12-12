import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const memories = sqliteTable('memories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  timestamp: text('timestamp').notNull(),
})

export type Memory = typeof memories.$inferSelect
export type NewMemory = typeof memories.$inferInsert
