import { Todo } from '@/types'
import useSWR from 'swr'
import { useUser } from './use-user'
import { addTodoToStore, getTodos } from '@/lib/todos'

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

  const addTodo = async (title: string, description: string) => {
    const newTodo = await addTodoToStore(uid, { title, description })
    mutate()
    return newTodo
  }

  if (user.loading) {
    return {
      todos: [],
      error: null,
      loading: true,
      mutate: () => {},
      addTodo: async () => {},
    }
  }

  return {
    todos: data?.todos ?? [],
    error,
    loading: isLoading,
    mutate,
    addTodo,
  }
}
