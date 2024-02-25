import type { Task, TaskStatus } from '@/types'
import { useUser } from './use-user'
import { addTaskToStore, updateTaskStatus, getTasks, compareTasks } from '@/lib/tasks'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { tasksAtom } from '@/states/tasks'

export const useTasks = (): {
  tasks: Task[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  loading: boolean
  addTask: (title: string, description: string, deadline: string) => Promise<Task>
  changeStatus: (id: string, status: TaskStatus, newState: boolean) => Promise<void>
} => {
  const [isLoading, setIsLoading] = useState(true)
  const [user] = useUser()
  const [tasks, setTasks] = useAtom(tasksAtom)

  const uid = user.data?.uid ?? ''

  const addTask = async (title: string, description: string, deadline: string): Promise<Task> => {
    const id = window.crypto.randomUUID()
    const now = Date.now()
    const newTask: Task = {
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
      await addTaskToStore(uid, { id, title, description, deadline })
      setTasks((tasks) => [newTask, ...tasks].sort(compareTasks))
    } else {
      // サインインしていないときはローカルストレージに追加
      const tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]')
      tasks.push(newTask)
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    return newTask
  }

  const changeStatus = async (id: string, status: TaskStatus, newState: boolean): Promise<void> => {
    // サインインしているときはFirestoreを更新
    if (uid) {
      updateTaskStatus(uid, id, status, newState)
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id !== id) return task
          return { ...task, [status]: newState }
        }),
      )
    } else {
      // サインインしていないときはローカルストレージを更新
      const tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]')
      const task = tasks.find((t: Task) => t.id === id)
      if (task) {
        task[status] = newState
      }
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  useEffect(() => {
    if (uid) {
      getTasks(uid).then((result) => {
        setTasks(result.tasks)
        setIsLoading(false)
      })
    } else if (!user.loading) {
      setIsLoading(false)
    }
  }, [uid, user.loading, setTasks])

  if (user.loading || isLoading) {
    return {
      tasks: [],
      error: null,
      loading: true,
      addTask: async () => ({
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
      tasks: JSON.parse(window.localStorage.getItem('tasks') || '[]'),
      error: null,
      loading: false,
      addTask: addTask,
      changeStatus,
    }
  }

  return {
    tasks,
    error: null,
    loading: isLoading,
    addTask: addTask,
    changeStatus,
  }
}
