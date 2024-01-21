'use client'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'

export const AuthButton = () => {
  const [user] = useUser()

  // 認証情報の取得中は、ローディングスケルトンを表示する
  if (user.loading) {
    return <Skeleton className="h-10 w-20" />
  }

  // ログインしていない場合は、ログインボタンを表示する
  if (!user.data) {
    return (
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <Button type="button" variant="outline">
      Sign Out
    </Button>
  )
}
