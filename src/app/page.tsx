import { Container } from '@/components/container'
import { TodoForm } from '@/components/todo-form'
import { Todos } from '@/components/todos'

export default function Home() {
  return (
    <Container>
      <TodoForm />
      {/* <Todos /> */}
    </Container>
  )
}
