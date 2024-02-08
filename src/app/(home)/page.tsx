'use client'

import { Container } from '@/components/container'
import { useUser } from '@/hooks/use-user'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TodoForm } from '@/app/(home)/_components/todo-form'
import { Todos } from '@/components/todos'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isCreate = searchParams.has('create')

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace('/')
    }
  }

  const handleOpenDialog = () => {
    router.push('/?create')
  }

  return (
    <Container>
      <Dialog open={isCreate} onOpenChange={handleOpenChange}>
        <DialogContent>
          <TodoForm />
        </DialogContent>
      </Dialog>

      <Button variant="outline" onClick={handleOpenDialog}>
        Create Todo
      </Button>

      <div className="mt-6">
        <Todos />
      </div>
    </Container>
  )
}
