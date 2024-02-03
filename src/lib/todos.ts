import { Todo } from '@/types'

export const getTodos = async (uid: string) => {
  const res = await fetch(`/api/todos/${uid}`)
  const data = await res.json()
  return data
}

type TodoValues = Pick<Todo, 'title' | 'description'>

export const addTodoToStore = async (uid: string, { title, description }: TodoValues) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title, description, uid }),
  })
  const newTodo = await res.json()
  return newTodo
}
