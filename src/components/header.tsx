import Link from 'next/link'
import { Container } from './container'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <header className="border-b">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-lg font-bold md:py-6">
            <Link href="/">Auth Sample</Link>
          </h1>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
