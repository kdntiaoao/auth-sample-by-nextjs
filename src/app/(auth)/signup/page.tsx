'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { AuthCard } from '@/components/auth-card'
import { createUserWithEmailAndPassword } from '@/lib/auth'

export default function Signin() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    const { user, error } = await createUserWithEmailAndPassword(email, password)
    setLoading(false)
    if (error) {
      toast({
        variant: 'destructive',
        description: 'アカウント登録に失敗しました',
      })
    } else {
      console.log(`Signed up:`, user)
    }
  }

  return (
    <>
      <div className="pb-2">
        <AuthCard title="Sign Up" loading={loading} onSubmit={signUp} />
      </div>
      <Button asChild size="sm" variant="link">
        <Link href="/signin">アカウントをお持ちの方はこちら</Link>
      </Button>
    </>
  )
}
