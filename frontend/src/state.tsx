import { atom } from 'recoil'
import { Memory } from './api'

export const memoryToEditAtom = atom<Memory | null>({
  key: 'memoryToEdit',
  default: null,
})

export const memoryCacheAtom = atom<Record<number, Memory>>({
  key: 'memoryCache',
  default: {},
})
