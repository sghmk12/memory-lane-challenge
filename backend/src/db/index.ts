import Database from 'better-sqlite3'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/better-sqlite3'

// Initialize SQLite and Drizzle
const sqlite = new Database(process.env.DB_FILE_NAME!)
const db = drizzle(sqlite)

export * as schema from './schema'
export default db
