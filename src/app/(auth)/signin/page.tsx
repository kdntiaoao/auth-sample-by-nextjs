'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthCard } from '@/components/auth-card'
import { signInWithEmailAndPassword } from '@/lib/auth'

export default function Signin() {
  const signIn = async (email: string, password: string) => {
    const { user, error } = await signInWithEmailAndPassword(email, password)
    if (error) {
      alert('サインインに失敗しました')
    } else {
      console.log(`Signed in:`, user)
    }
  }

  return (
    <>
      <div className="pb-2">
        <AuthCard title="Sign In" onSubmit={signIn} />
      </div>
      <Button asChild size="sm" variant="link">
        <Link href="/signup">新しいアカウントを作成する</Link>
      </Button>
    </>
  )
}
