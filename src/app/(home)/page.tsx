'use client'

import { Container } from '@/components/container'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TodoForm } from '@/app/(home)/_components/todo-form'
import { Todos } from '@/components/todos'
import { Suspense } from 'react'

const Contents = () => {
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
    <>
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
    </>
  )
}

export default function Home() {
  return (
    <Container>
      <Suspense fallback={<p>Loading...</p>}>
        <Contents />
      </Suspense>
    </Container>
  )
}
