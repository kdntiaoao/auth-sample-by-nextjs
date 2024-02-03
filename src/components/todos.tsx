'use client'

import { useTodos } from '@/hooks/use-todos'

export const Todos = () => {
  const { todos, error, loading } = useTodos()

  if (loading) {
    return <p>Loading...</p>
  }

  if (todos.length === 0 || error) {
    return <p>No todos found.</p>
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="rounded-md border p-4">
          <h2 className="break-words text-lg font-bold">{todo.title}</h2>
          <p className="break-words text-sm">{todo.description}</p>
        </li>
      ))}
    </ul>
  )
}
