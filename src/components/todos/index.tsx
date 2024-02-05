'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useTodos } from '@/hooks/use-todos'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useState } from 'react'
import styles from './index.module.css'
import { toast } from 'sonner'

export const Todos = () => {
  const [completedTodos, setCompletedTodos] = useState<string[]>([])
  const { todos, error, loading, changeStatus } = useTodos()

  const todosFormatted = todos
    .filter((todo) => !todo.completed && !todo.deleted)
    .map((todo) => {
      return {
        ...todo,
        createdAtString: format(new Date(todo.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        updatedAtString: format(new Date(todo.updatedAt), 'yyyy-MM-dd HH:mm:ss'),
      }
    })

  const changeCompleteStatus = (id: string, checked: boolean) => {
    const todo = todosFormatted.find((todo) => todo.id === id)
    const todoElement = document.querySelector<HTMLElement>(`[data-todo="${id}"]`)
    const todoElementHeight = todoElement?.clientHeight
    if (todoElementHeight) {
      todoElement.style.height = `${todoElementHeight}px`
    }

    changeStatus(id, 'completed', checked)

    if (checked) {
      const title = todo?.title && todo.title.length > 10 ? todo?.title.slice(0, 10) + '...' : todo?.title || 'タスク'
      toast['success'](`「${title}」を完了にしました`, {
        action: {
          label: '元に戻す',
          onClick: () => changeCompleteStatus(id, !checked),
        },
      })
    }

    if (checked) {
      setCompletedTodos((prev) => [...prev, id])
    } else {
      setCompletedTodos((prev) => prev.filter((todoId) => todoId !== id))
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (todos.length === 0 || error) {
    return <p>No todos found.</p>
  }

  return (
    <ul>
      {todosFormatted.map((todo) => (
        <li
          key={todo.id}
          data-todo={todo.id}
          className={clsx(
            'mb-4 overflow-hidden transition-all duration-300',
            completedTodos.includes(todo.id) && 'delay-200',
            completedTodos.includes(todo.id) && styles.shrink,
          )}
        >
          <div
            className={clsx(
              'flex gap-2 rounded-md border p-4 transition-all duration-200',
              !completedTodos.includes(todo.id) && 'delay-300',
              completedTodos.includes(todo.id) && 'opacity-0 delay-0'
            )}
          >
            <div>
              <Checkbox
                id={todo.id}
                checked={completedTodos.includes(todo.id)}
                disabled={completedTodos.includes(todo.id)}
                onCheckedChange={(checked) => changeCompleteStatus(todo.id, !!checked)}
              />
            </div>
            <label htmlFor={todo.id} className="grid flex-1 gap-2">
              <span className="break-words font-bold">{todo.title}</span>
              <span className="text-sm">
                created at: {todo.createdAtString}
                <br />
                updated at: {todo.updatedAtString}
              </span>
              {todo.description && <span className="break-words text-sm">{todo.description}</span>}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}
