export type Task = {
  id: string
  title: string
  description: string
  completed: boolean
  deleted: boolean
  createdAt: number
  updatedAt: number
  deadline: string
}

export type TaskStatus = 'completed' | 'deleted'

export type TasksResult = {
  tasks: Task[]
  page: number
  totalTasks: number
  totalPages: number
}
