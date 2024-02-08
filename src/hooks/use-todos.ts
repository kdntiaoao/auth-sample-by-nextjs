import { Todo, TodoStatus } from '@/types'
import useSWR from 'swr'
import { useUser } from './use-user'
import { addTodoToStore, updateTodoStatus, getTodos } from '@/lib/todos'

type TodosResult = {
  todos: Todo[]
  page: number
  totalTodos: number
  totalPages: number
}

export const useTodos = (): {
  todos: Todo[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  loading: boolean
  mutate: () => void
  addTodo: (title: string, description: string) => Promise<Todo>
  changeStatus: (id: string, status: TodoStatus, newState: boolean) => Promise<void>
} => {
  const [user] = useUser()

  const uid = user.data?.uid ?? ''
  const { data, error, isLoading, mutate } = useSWR<TodosResult>(uid, getTodos)

  const addTodo = async (title: string, description: string): Promise<Todo> => {
    let newTodo: Todo
    // サインインしているときはFirestoreに追加
    if (uid) {
      newTodo = await addTodoToStore(uid, { title, description })
    } else {
      // サインインしていないときはローカルストレージに追加
      const todos = JSON.parse(window.localStorage.getItem('todos') || '[]')
      const now = Date.now()
      newTodo = {
        id: todos.length + 1,
        title,
        description,
        completed: false,
        deleted: false,
        createdAt: now,
        updatedAt: now,
      }
      todos.push(newTodo)
      window.localStorage.setItem('todos', JSON.stringify(todos))
    }
    mutate()
    return newTodo
  }

  const changeStatus = async (id: string, status: TodoStatus, newState: boolean) => {
    // サインインしているときはFirestoreを更新
    if (uid) {
      await updateTodoStatus(uid, id, status, newState)
    } else {
      // サインインしていないときはローカルストレージを更新
      const todos = JSON.parse(window.localStorage.getItem('todos') || '[]')
      const todo = todos.find((todo: Todo) => todo.id === id)
      if (todo) {
        todo[status] = newState
      }
      setTimeout(() => {
        window.localStorage.setItem('todos', JSON.stringify(todos))
      }, 500)
    }
    mutate()
  }

  if (user.loading) {
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
      }),
      changeStatus: async () => {},
    }
  }

  if (!uid) {
    return {
      todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
      error,
      loading: isLoading,
      mutate,
      addTodo,
      changeStatus,
    }
  }

  return {
    todos: data?.todos ?? [],
    error,
    loading: isLoading,
    mutate,
    addTodo,
    changeStatus,
  }
}
