import Link from 'next/link'
import { Container } from './container'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <header className="border-b">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-lg font-bold">
            <Link href="/">Auth Sample</Link>
          </h1>
          <Button asChild variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </Container>
    </header>
  )
}
