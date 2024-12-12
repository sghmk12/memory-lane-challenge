/// <reference types="node" />

import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  driver: 'better-sqlite',
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
})
