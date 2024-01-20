import Link from 'next/link'
import { Container } from './container'

export const Header = () => {
  return (
    <header className='border-b'>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-lg font-bold">
            <Link href="/">Auth Sample</Link>
          </h1>
        </div>
      </Container>
    </header>
  )
}
