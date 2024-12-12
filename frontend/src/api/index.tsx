import axios from 'axios'
import { MEMORY_API_ENDPOINT } from './endpoints'
import {
  CreateMemoryInput,
  CreateMemoryResponse,
  DeleteMemoryResponse,
  GetMemoriesResponse,
  GetMemoryResponse,
  UpdateMemoryResponse,
} from './types'

export function getMemories() {
  console.log('getMemories', MEMORY_API_ENDPOINT)
  return axios
    .get(MEMORY_API_ENDPOINT)
    .then((res) => res.data as GetMemoriesResponse)
}

export function createMemory(data: CreateMemoryInput) {
  return axios
    .post(MEMORY_API_ENDPOINT, data)
    .then((res) => res.data as CreateMemoryResponse)
}

export function getMemory(id: number) {
  return axios
    .get(MEMORY_API_ENDPOINT + `/${id}`)
    .then((res) => res.data as GetMemoryResponse)
}

export function updateMemory(id: number, data: CreateMemoryInput) {
  return axios
    .put(MEMORY_API_ENDPOINT + `/${id}`, data)
    .then((res) => res.data as UpdateMemoryResponse)
}

export function deleteMemory(id: number) {
  return axios
    .delete(MEMORY_API_ENDPOINT + `/${id}`)
    .then((res) => res.data as DeleteMemoryResponse)
}

export * from './types'
