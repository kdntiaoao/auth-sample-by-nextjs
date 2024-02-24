import type { Todo, TodoStatus } from '@/types'
import { useUser } from './use-user'
import { addTodoToStore, updateTodoStatus, getTodos } from '@/lib/todos'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { todosAtom } from '@/states/todos'

export const useTodos = (): {
  todos: Todo[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  loading: boolean
  addTodo: (title: string, description: string, deadline: string) => Promise<Todo>
  changeStatus: (id: string, status: TodoStatus, newState: boolean) => Promise<void>
} => {
  const [isLoading, setIsLoading] = useState(true)
  const [user] = useUser()
  const [todos, setTodos] = useAtom(todosAtom)

  const uid = user.data?.uid ?? ''
  // const { data, error, isLoading, isValidating, mutate } = useSWR<TodosResult>(uid, getTodos)

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
      setTodos((todos) => [newTodo, ...todos].sort((a, b) => a.deadline.localeCompare(b.deadline)))
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
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo.id !== id) return todo
          return { ...todo, [status]: newState }
        }),
      )
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
    if (uid) {
      getTodos(uid).then((result) => {
        setTodos(result.todos)
        setIsLoading(false)
      })
    } else if (!user.loading) {
      setIsLoading(false)
    }
  }, [uid, user.loading, setTodos])

  if (user.loading || isLoading) {
    return {
      todos: [],
      error: null,
      loading: true,
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
      addTodo,
      changeStatus,
    }
  }

  return {
    todos,
    error: null,
    loading: isLoading,
    addTodo,
    changeStatus,
  }
}
