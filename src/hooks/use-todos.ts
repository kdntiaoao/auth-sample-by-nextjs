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

export const useTodos = () => {
  const [user] = useUser()

  const uid = user.data?.uid ?? ''
  const { data, error, isLoading, mutate } = useSWR<TodosResult>(uid, getTodos)

  const addTodo = async (title: string, description: string): Promise<Todo> => {
    const newTodo = await addTodoToStore(uid, { title, description })
    mutate()
    return newTodo
  }

  const changeStatus = async (id: string, status: TodoStatus, newState: boolean) => {
    await updateTodoStatus(uid, id, status, newState)
    mutate()
  }

  if (user.loading) {
    return {
      todos: [],
      error: null,
      loading: true,
      mutate: () => {},
      addTodo: async () => {},
      changeStatus: async () => {},
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
