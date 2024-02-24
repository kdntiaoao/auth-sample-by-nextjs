'use client'

import { toast } from 'sonner'
import { TodosListItem } from '../todos-list-item'
import { Todo, TodoStatus } from '@/types'

type Props = {
  todos: Todo[]
  status?: 'todo' | 'completed' | 'deleted'
  changeStatus: (id: string, status: TodoStatus, newState: boolean) => void
}

export const TodosList = ({ todos, status = 'todo', changeStatus }: Props) => {
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

  const changeCompletedState = (id: string, checked: boolean, isToastDisplayed: boolean = true) => {
    const todo = todos.find((todo) => todo.id === id)

    changeStatus(id, 'completed', checked)

    const title = todo?.title && todo.title.length > 10 ? todo?.title.slice(0, 10) + '...' : todo?.title || 'タスク'
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

  if (!todosFormatted.length || todosFormatted.every((todo) => todo.hidden)) {
    return <p>No todos found.</p>
  }

  return (
    <>
      <ul>
        {todosFormatted.map((todo) => (
          <TodosListItem
            key={todo.id}
            todo={todo}
            hidden={todo.hidden}
            onCheckedChange={(checked) => changeCompletedState(todo.id, checked)}
            onDelete={() => changeDeletedState(todo.id)}
          />
        ))}
      </ul>
    </>
  )
}
