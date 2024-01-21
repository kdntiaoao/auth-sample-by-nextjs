import { useAtom } from 'jotai'
import { userAtom } from '@/states/auth'

export const useUser = () => {
  return useAtom(userAtom)
}
