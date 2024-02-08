import { Todo, TodoStatus } from '@/types'

export const getTodos = async (uid: string) => {
  if (!uid) return []
  const res = await fetch(`/api/todos/${uid}`)
  const data = await res.json()
  return data
}

type TodoValues = Pick<Todo, 'title' | 'description'>

export const addTodoToStore = async (uid: string, { title, description }: TodoValues): Promise<Todo> => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title, description, uid }),
  })
  const newTodo: Todo = await res.json()
  return newTodo
}

export const updateTodoStatus = async (uid: string, todoid: string, status: TodoStatus, newState: boolean) => {
  const res = await fetch(`/api/todos/${uid}/${todoid}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, newState }),
  })
  const updatedTodo = await res.json()
  return updatedTodo
}
