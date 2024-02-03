import { Todo } from '@/types'
import useSWR, { Fetcher } from 'swr'
import { useUser } from './use-user'

type TodosResult = {
  todos: Todo[]
  page: number
  totalTodos: number
  totalPages: number
}

const fetcher = <T>(url: string): ReturnType<Fetcher<T>> => fetch(url).then((res) => res.json())

export const useTodos = () => {
  const [user] = useUser()

  const uid = user.data?.uid ?? ''
  const { data, error, isLoading, mutate } = useSWR<TodosResult>(`/api/todos/${uid}`, fetcher)

  const addTodo = async (title: string, description: string) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title, description, uid }),
    })
    const newTodo = await res.json()
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
