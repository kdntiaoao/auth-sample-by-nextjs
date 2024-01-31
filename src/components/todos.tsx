'use client'

import { useTodos } from '@/hooks/use-todos'

export const Todos = () => {
  const { todos } = useTodos()
  console.log(todos)

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="rounded-md border p-4">
          <h2 className="text-lg font-bold">{todo.title}</h2>
          <p className="text-sm">{todo.description}</p>
        </li>
      ))}
    </ul>
  )
}
