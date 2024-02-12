export type Todo = {
  id: string
  title: string
  description: string
  completed: boolean
  deleted: boolean
  createdAt: number
  updatedAt: number
  deadline: string
}

export type TodoStatus = 'completed' | 'deleted'

export type TodosResult = {
  todos: Todo[]
  page: number
  totalTodos: number
  totalPages: number
}
