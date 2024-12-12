export interface Memory {
  id: number
  name: string
  description: string
  timestamp: string
}

export interface CreateMemoryInput {
  name: string
  description: string
  timestamp: string
}

export interface GetMemoriesResponse {
  memories: Memory[]
}

export interface CreateMemoryResponse {
  message: string
}

export interface GetMemoryResponse {
  memory: Memory
}

export interface UpdateMemoryResponse {
  message: string
}

export interface DeleteMemoryResponse {
  message: string
}
