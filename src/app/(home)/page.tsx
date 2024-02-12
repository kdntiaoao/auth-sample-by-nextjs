import { Container } from '@/components/container'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TodoForm } from '@/app/(home)/_components/todo-form'
import { Todos } from '@/components/todos'

export default function Home() {
  return (
    <Container>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Todo</Button>
        </DialogTrigger>

        <DialogContent>
          <TodoForm />
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <Todos />
      </div>
    </Container>
  )
}
