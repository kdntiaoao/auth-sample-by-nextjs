'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useTodos } from '@/hooks/use-todos'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useState } from 'react'
import styles from './index.module.css'

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

  const completeTodo = (id: string, checked: boolean) => {
    const todoElement = document.querySelector<HTMLElement>(`[data-todo="${id}"]`)
    const todoElementHeight = todoElement?.clientHeight
    if (todoElementHeight) {
      todoElement.style.height = `${todoElementHeight}px`
    }
    changeStatus(id, 'completed', checked)
    setCompletedTodos((prev) => [...prev, id])
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
          className={clsx('mb-4', completedTodos.includes(todo.id) && styles.shrink)}
        >
          <div className={clsx('flex gap-2 rounded-md border p-4', completedTodos.includes(todo.id) && styles.fadeOut)}>
            <div>
              <Checkbox
                id={todo.id}
                disabled={completedTodos.includes(todo.id)}
                onCheckedChange={(checked) => completeTodo(todo.id, !!checked)}
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
