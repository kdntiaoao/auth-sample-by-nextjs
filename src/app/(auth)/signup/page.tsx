'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthCard } from '@/components/auth-card'
import { createUserWithEmailAndPassword } from '@/lib/auth'

export default function Signin() {
  const signUp = async (email: string, password: string) => {
    const { user, error } = await createUserWithEmailAndPassword(email, password)
    if (error) {
      alert('アカウント登録に失敗しました')
    } else {
      console.log(`Signed up:`, user)
    }
  }

  return (
    <>
      <div className="pb-2">
        <AuthCard title="Sign Up" onSubmit={signUp} />
      </div>
      <Button asChild size="sm" variant="link">
        <Link href="/signin">アカウントをお持ちの方はこちら</Link>
      </Button>
    </>
  )
}
