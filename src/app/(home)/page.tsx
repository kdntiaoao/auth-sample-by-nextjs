'use client'

import { Container } from '@/components/container'
import { useUser } from '@/hooks/use-user'
import { NotSignedIn } from './_components/not-signed-in'
import { SignedIn } from './_components/signed-in'

const Contents = () => {
  const [user] = useUser()

  if (user.loading) {
    return <p>Loading...</p>
  }

  if (!user.data) {
    return <NotSignedIn />
  }

  return <SignedIn />
}

export default function Home() {
  return (
    <Container>
      <Contents />
    </Container>
  )
}
