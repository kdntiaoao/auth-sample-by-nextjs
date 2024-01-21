import Link from 'next/link'
import { Container } from './container'
import { AuthButton } from './auth-button'

export const Header = () => {
  return (
    <header className="border-b">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-lg font-bold md:py-6">
            <Link href="/">Auth Sample</Link>
          </h1>
          <AuthButton />
        </div>
      </Container>
    </header>
  )
}
