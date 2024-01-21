'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from "@/components/ui/separator"
import { AuthCard } from '@/components/auth-card'
import { AuthCardSkeleton } from '@/components/auth-card-skeleton'
import { useUser } from '@/hooks/use-user'
import { createUserWithEmailAndPassword, signInWithGoogle } from '@/lib/auth'

export default function Signin() {
  const router = useRouter()
  const [user] = useUser()

  const loading = user.loading || user.data

  const signUp = async (email: string, password: string) => {
    const { user, error } = await createUserWithEmailAndPassword(email, password)
    if (error) {
      alert('アカウント登録に失敗しました')
    } else {
      console.log(`Signed up:`, user)
    }
  }

  useEffect(() => {
    if (user.data) {
      router.replace('/')
    }
  }, [user.data])

  return (
    <div className="py-4">
      <div className="mx-auto w-[350px]">
        <div className="pb-2">
          {loading ? <AuthCardSkeleton /> : <AuthCard title="Sign Up" onSubmit={signUp} />}
        </div>
        {loading ? (
          <Skeleton className="h-8 w-40 max-w-full" />
        ) : (
          <>
          <Button asChild size="sm" variant="link">
            <Link href="/signin">アカウントをお持ちの方はこちら</Link>
          </Button>
          <Separator className='my-4' />
          <Button className='flex items-center gap-2 mx-auto' onClick={signInWithGoogle}>
            <Image src="/google.png" width={20} height={20} alt="Googleのロゴ" />
            Sign in with Google
          </Button>
          </>
        )}
      </div>
    </div>
  )
}
