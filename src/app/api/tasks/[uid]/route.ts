import type { Task, TasksResult } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

const TASKS_PER_PAGE = 10

export const dynamic = 'force-dynamic'

// Task一覧を取得する
export async function GET(request: Request, context: { params: { uid: string } }) {
  const { uid } = context.params

  // ユーザーが存在するか確認
  try {
    await auth.getUser(uid)
  } catch (error) {
    return new Response('User not found', {
      status: 404,
    })
  }

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') || 1)

  const tasksRef = db.collection('users').doc(uid).collection('tasks')
  const snapshot = await tasksRef.get()

  const tasksAll: Task[] = []
  snapshot.forEach((doc) => {
    tasksAll.push({ id: doc.id, ...doc.data() } as Task)
  })
  tasksAll.sort((a, b) => a.deadline.localeCompare(b.deadline))

  const totalTasks = tasksAll.length
  const totalPages = Math.ceil(totalTasks / TASKS_PER_PAGE) || 1

  if (page > totalPages) {
    const result: TasksResult = {
      tasks: [],
      page,
      totalTasks,
      totalPages,
    }
    return new Response(JSON.stringify(result), {
      status: 200,
    })
  }

  const tasks = tasksAll.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE)

  const result: TasksResult = {
    tasks,
    page,
    totalTasks: tasks.length,
    totalPages: 1,
  }

  return new Response(JSON.stringify(result), {
    status: 200,
  })
}
