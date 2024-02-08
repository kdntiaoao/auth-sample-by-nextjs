import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const NotSignedIn = () => {
  return (
    <div className="text-center">
      <p>サインインしてください</p>
      <div className="mt-4">
        <Button asChild variant="outline">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
