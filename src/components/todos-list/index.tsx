'use client'

import { toast } from 'sonner'
import { TodosListItem } from '../todos-list-item'
import { Todo, TodoStatus } from '@/types'
import { useRouter } from 'next/navigation'

type Props = {
  todos: Todo[]
  status?: 'todo' | 'completed' | 'deleted'
  changeStatus: (id: string, status: TodoStatus, newState: boolean) => void
}

export const TodosList = ({ todos, status = 'todo', changeStatus }: Props) => {
  const router = useRouter()

  const checkHidden = (todo: Todo): boolean => {
    switch (status) {
      case 'todo':
        return todo.completed || todo.deleted
      case 'completed':
        return !todo.completed || todo.deleted
      case 'deleted':
        return !todo.deleted
    }
  }

  const todosFormatted: (Todo & { hidden: boolean })[] = todos.map((todo) => {
    const hidden = checkHidden(todo)
    return { ...todo, hidden }
  })

  const changeCompletedStatus = (id: string, checked: boolean) => {
    const todo = todos.find((todo) => todo.id === id)

    changeStatus(id, 'completed', checked)

    const title = todo?.title && todo.title.length > 10 ? todo?.title.slice(0, 10) + '...' : todo?.title || 'タスク'
    const message = checked ? `「${title}」を完了にしました` : `「${title}」を未完了にしました`

    const toastId = toast.success(message, {
      id: id,
      duration: 10 * 60 * 1000,
      action: {
        label: '元に戻す',
        onClick: () => changeCompletedStatus(id, !checked),
      },
    })

    console.log(toastId)
  }

  const changeDeletedStatus = (id: string) => {
    changeStatus(id, 'deleted', true)
  }

  if (!todosFormatted.length || todosFormatted.every((todo) => todo.hidden)) {
    return <p>No todos found.</p>
  }

  // console.log(
  //   JSON.stringify(
  //     todos.map((t) => ({ t: t.title, comp: t.completed })),
  //     null,
  //     2,
  //   ),
  // )

  return (
    <>
      <ul>
        {todosFormatted.map((todo) => (
          <TodosListItem
            key={todo.id}
            todo={todo}
            hidden={todo.hidden}
            onCheckedChange={(checked) => changeCompletedStatus(todo.id, checked)}
            onDelete={() => changeDeletedStatus(todo.id)}
          />
        ))}
      </ul>
    </>
  )
}
