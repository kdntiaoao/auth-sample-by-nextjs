'use client'

import { Container } from '@/components/container'
import { TodoForm } from '@/components/todo-form'
import { Todos } from '@/components/todos'
import { useUser } from '@/hooks/use-user'

const Contents = () => {
  const [user] = useUser()

  if (user.loading) {
    return <p>Loading...</p>
  }

  if (!user.data) {
    return <p>Sign in to see your todos.</p>
  }

  return (
    <>
      <TodoForm />
      <Todos />
    </>
  )
}

export default function Home() {
  return (
    <Container>
      <Contents />
    </Container>
  )
}
