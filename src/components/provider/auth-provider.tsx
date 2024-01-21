'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { useUser } from '@/hooks/use-user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setUser] = useUser()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUser({
        data: user,
        loading: false,
      })
    })
    return () => unsub()
  }, [setUser])

  return <>{children}</>
}
