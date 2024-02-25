'use client'

import { TasksList } from '@/components/tasks-list'
import { useTasks } from '@/hooks/use-tasks'

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

export const Tasks = () => {
  const { tasks: tasks, error, loading, changeStatus } = useTasks()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>No tasks found.</p>
  }

  return (
    <div className="grid gap-10">
      {STATUS_LIST.map((status) => (
        <section key={status.id}>
          <h2 className="pb-4 text-lg font-bold">{status.label}</h2>
          <TasksList tasks={tasks} status={status.id} changeStatus={changeStatus} />
        </section>
      ))}
    </div>
  )
}
