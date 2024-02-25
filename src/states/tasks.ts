import { Task } from '@/types'
import { atom } from 'jotai'

export const tasksAtom = atom<Task[]>([])
