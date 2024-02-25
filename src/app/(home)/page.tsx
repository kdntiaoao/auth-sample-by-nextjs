import { Container } from '@/components/container'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TaskForm } from '@/app/(home)/_components/task-form'
import { Tasks } from '@/components/tasks'

export default function Home() {
  return (
    <Container>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Task</Button>
        </DialogTrigger>

        <DialogContent>
          <TaskForm />
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <Tasks />
      </div>
    </Container>
  )
}
