'use client'

import { toast } from 'sonner'
import { TasksListItem } from '../tasks-list-item'
import { Task, TaskStatus } from '@/types'
import clsx from 'clsx'

type Props = {
  tasks: Task[]
  status?: 'todo' | 'completed' | 'deleted'
  changeStatus: (id: string, status: TaskStatus, newState: boolean) => void
}

export const TasksList = ({ tasks: tasks, status = 'todo', changeStatus }: Props) => {
  const checkHidden = (task: Task): boolean => {
    switch (status) {
      case 'todo':
        return task.completed || task.deleted
      case 'completed':
        return !task.completed || task.deleted
      case 'deleted':
        return !task.deleted
    }
  }

  const tasksFormatted: (Task & { hidden: boolean })[] = tasks.map((task) => {
    const hidden = checkHidden(task)
    return { ...task, hidden }
  })

  const isNotFound = !tasksFormatted.length || tasksFormatted.every((task) => task.hidden)

  const changeCompletedState = (id: string, checked: boolean, isToastDisplayed: boolean = true) => {
    const task = tasks.find((t) => t.id === id)

    changeStatus(id, 'completed', checked)

    const title = task?.title && task.title.length > 10 ? task?.title.slice(0, 10) + '...' : task?.title || 'タスク'
    const message = checked ? `「${title}」を完了にしました` : `「${title}」を未完了にしました`

    if (isToastDisplayed) {
      toast.success(message, {
        id: id,
        duration: 4000,
        action: {
          label: '元に戻す',
          onClick: () => changeCompletedState(id, !checked, false),
        },
      })
    }
  }

  const changeDeletedState = (id: string) => {
    changeStatus(id, 'deleted', true)
  }

  return (
    <>
      <p className={clsx('transition-all duration-1000', !isNotFound && 'hidden')}>No tasks found.</p>
      <ul>
        {tasksFormatted.map((task) => (
          <TasksListItem
            key={task.id}
            task={task}
            hidden={task.hidden}
            onCheckedChange={(checked) => changeCompletedState(task.id, checked)}
            onDelete={() => changeDeletedState(task.id)}
          />
        ))}
      </ul>
    </>
  )
}
