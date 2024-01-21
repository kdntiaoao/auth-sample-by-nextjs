'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { AuthCard } from '@/components/auth-card'
import { signInWithEmailAndPassword } from '@/lib/auth'

export default function Signin() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { user, error } = await signInWithEmailAndPassword(email, password)
    setLoading(false)
    if (error) {
      toast({
        variant: 'destructive',
        description: 'サインインに失敗しました',
      })
    } else {
      console.log(`Signed in:`, user)
    }
  }

  return (
    <>
      <div className="pb-2">
        <AuthCard title="Sign In" loading={loading} onSubmit={signIn} />
      </div>
      <Button asChild size="sm" variant="link">
        <Link href="/signup">新しいアカウントを作成する</Link>
      </Button>
    </>
  )
}
