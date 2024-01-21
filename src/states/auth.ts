import { atom } from 'jotai'
import type { User as UserData } from 'firebase/auth'

export type User =
  | {
      data: null
      loading: true
    }
  | {
      data: UserData | null
      loading: false
    }

export const userAtom = atom<User>({
  data: null,
  loading: true,
})
