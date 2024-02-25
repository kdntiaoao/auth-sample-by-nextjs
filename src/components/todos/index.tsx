'use client'

import { TodosList } from '@/components/todos-list'
import { useTodos } from '@/hooks/use-todos'

type Status = 'todo' | 'completed' | 'deleted'

const STATUS_LIST: {
  id: Status
  label: string
}[] = [
  {
    id: 'todo',
    label: 'To Do',
  },
  {
    id: 'completed',
    label: 'Completed',
  },
  {
    id: 'deleted',
    label: 'Deleted',
  },
]

export const Todos = () => {
  const { todos, error, loading, changeStatus } = useTodos()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>No todos found.</p>
  }

  return (
    <div className="grid gap-10">
      {STATUS_LIST.map((status) => (
        <section key={status.id}>
          <h2 className="pb-4 text-lg font-bold">{status.label}</h2>
          <TodosList todos={todos} status={status.id} changeStatus={changeStatus} />
        </section>
      ))}
    </div>
  )
}
