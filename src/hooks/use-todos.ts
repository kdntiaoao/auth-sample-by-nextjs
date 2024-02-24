import { Todo, TodoStatus, TodosResult } from '@/types'
import useSWR from 'swr'
import { useUser } from './use-user'
import { addTodoToStore, updateTodoStatus, getTodos } from '@/lib/todos'
import { useEffect } from 'react'

export const useTodos = (): {
  todos: Todo[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  loading: boolean
  mutate: () => void
  addTodo: (title: string, description: string, deadline: string) => Promise<Todo>
  changeStatus: (id: string, status: TodoStatus, newState: boolean) => Promise<void>
} => {
  const [user] = useUser()

  const uid = user.data?.uid ?? ''
  const { data, error, isLoading, isValidating, mutate } = useSWR<TodosResult>(uid, getTodos, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const addTodo = async (title: string, description: string, deadline: string): Promise<Todo> => {
    const id = window.crypto.randomUUID()
    const now = Date.now()
    const newTodo: Todo = {
      id,
      title,
      description,
      completed: false,
      deleted: false,
      createdAt: now,
      updatedAt: now,
      deadline,
    }
    // サインインしているときはFirestoreに追加
    if (uid) {
      await addTodoToStore(uid, { id, title, description, deadline })
      mutate((data) => {
        const result: TodosResult = {
          ...data,
          todos: [newTodo, ...(data?.todos ?? [])].sort((a, b) => a.deadline.localeCompare(b.deadline)),
        } as TodosResult
        return result
      })
    } else {
      // サインインしていないときはローカルストレージに追加
      const todos = JSON.parse(window.localStorage.getItem('todos') || '[]')
      todos.push(newTodo)
      window.localStorage.setItem('todos', JSON.stringify(todos))
    }
    return newTodo
  }

  const changeStatus = async (id: string, status: TodoStatus, newState: boolean): Promise<void> => {
    // サインインしているときはFirestoreを更新
    if (uid) {
      updateTodoStatus(uid, id, status, newState)
      mutate((data) => {
        if (!data) return data
        const result: TodosResult = {
          ...data,
          todos: data.todos.map((todo) => {
            if (todo.id !== id) return todo
            console.log(todo.title, newState)
            return { ...todo, [status]: newState }
          }),
        } as TodosResult
        return result
      })
    } else {
      // サインインしていないときはローカルストレージを更新
      const todos = JSON.parse(window.localStorage.getItem('todos') || '[]')
      const todo = todos.find((todo: Todo) => todo.id === id)
      if (todo) {
        todo[status] = newState
      }
      window.localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  useEffect(() => {
    console.log({ isValidating })
  }, [isValidating])

  if (user.loading || isLoading) {
    return {
      todos: [],
      error: null,
      loading: true,
      mutate: () => {},
      addTodo: async () => ({
        id: '',
        title: '',
        description: '',
        completed: false,
        deleted: false,
        createdAt: 0,
        updatedAt: 0,
        deadline: '',
      }),
      changeStatus: async () => {},
    }
  }

  if (!uid) {
    return {
      todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
      error: null,
      loading: false,
      mutate: () => {},
      addTodo,
      changeStatus,
    }
  }

  console.log(
    'useTodos',
    JSON.stringify(
      data?.todos.map((t) => ({ t: t.title, comp: t.completed })),
      null,
      2,
    ),
  )

  return {
    todos: data?.todos ?? [],
    error,
    loading: isLoading,
    mutate,
    addTodo,
    changeStatus,
  }
}
