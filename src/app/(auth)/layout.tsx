'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useUser } from '@/hooks/use-user'
import { signInWithGoogle } from '@/lib/auth'
import { AuthPageSkeleton } from './_components/auth-page-skeleton'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user] = useUser()

  useEffect(() => {
    if (user.data) {
      router.replace('/')
    }
  }, [user.data])

  if (user.loading) {
    return <AuthPageSkeleton />
  }

  return (
    <div className="py-4">
      <div className="mx-auto w-[350px]">
        {children}
        <Separator className="my-4" />
        <Button className="mx-auto flex items-center gap-2" onClick={signInWithGoogle}>
          <Image src="/google.png" width={20} height={20} alt="Googleのロゴ" />
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
