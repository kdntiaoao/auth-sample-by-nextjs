import { Task, TaskStatus, TasksResult } from '@/types'

export const getTasks = async (uid: string): Promise<TasksResult> => {
  if (!uid) return { tasks: [], page: 1, totalTasks: 0, totalPages: 1 }
  const res = await fetch(`/api/tasks/${uid}`)
  const data = await res.json()
  return data
}

type TaskValues = Omit<Task, 'completed' | 'deleted' | 'createdAt' | 'updatedAt'>

export const addTaskToStore = async (uid: string, { id, title, description, deadline }: TaskValues): Promise<Task> => {
  const res = await fetch(`/api/tasks/${uid}`, {
    method: 'POST',
    body: JSON.stringify({ id, title, description, deadline, uid }),
  })
  const newTask: Task = await res.json()
  return newTask
}

export const updateTaskStatus = async (uid: string, taskId: string, status: TaskStatus, newState: boolean) => {
  const res = await fetch(`/api/tasks/${uid}/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, newState }),
  })
  const updatedTask = await res.json()
  return updatedTask
}

export const compareTasks = (a: Task, b: Task) => {
  if (a.deadline === b.deadline) {
    return a.updatedAt - b.updatedAt
  }
  return a.deadline.localeCompare(b.deadline)
}
