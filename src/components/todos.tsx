'use client'

import { useTodos } from '@/hooks/use-todos'
import { format } from 'date-fns'

export const Todos = () => {
  const { todos, error, loading } = useTodos()

  const todosWithDate = todos.map((todo) => {
    return {
      ...todo,
      createdAtString: format(new Date(todo.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      updatedAtString: format(new Date(todo.updatedAt), 'yyyy-MM-dd HH:mm:ss'),
    }
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (todos.length === 0 || error) {
    return <p>No todos found.</p>
  }

  return (
    <ul className="space-y-4">
      {todosWithDate.map((todo) => (
        <li key={todo.id} className="rounded-md border p-4">
          <div>
            <h2 className="break-words text-lg font-bold">{todo.title}</h2>
            <p className="text-sm">
              created at: {todo.createdAtString}
              <br />
              updated at: {todo.updatedAtString}
            </p>
          </div>
          <p className="break-words text-sm">{todo.description}</p>
        </li>
      ))}
    </ul>
  )
}
