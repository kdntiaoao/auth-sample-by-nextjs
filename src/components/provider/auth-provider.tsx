'use client'

import { useEffect } from 'react'
import { useUser } from '@/hooks/use-user'
import { onAuthStateChanged } from '@/lib/auth'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setUser] = useUser()

  useEffect(() => {
    const unsub = onAuthStateChanged((user) => {
      setUser({
        data: user,
        loading: false,
      })
    })
    return () => unsub()
  }, [setUser])

  return <>{children}</>
}
