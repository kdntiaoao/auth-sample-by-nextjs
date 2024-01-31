import { Todo } from '@/types'
import useSWR, { Fetcher } from 'swr'

type TodosResult = {
  todos: Todo[]
  page: number
  totalTodos: number
  totalPages: number
}

const fetcher = <T>(url: string): ReturnType<Fetcher<T>> => fetch(url).then((res) => res.json())

export const useTodos = () => {
  const { data, error, isLoading } = useSWR<TodosResult>('/api/todos', fetcher)

  return {
    todos: data?.todos ?? [],
    error,
    isLoading,
  }
}
