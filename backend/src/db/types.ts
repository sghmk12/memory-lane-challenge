import { Generated } from 'kysely'

export interface Database {
  memories: MemoryTable
}

export interface MemoryTable {
  id: Generated<number>
  name: string
  description: string
  timestamp: string
}
