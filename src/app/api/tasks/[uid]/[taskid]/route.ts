import type { Task, TaskStatus } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

type Body = { status: TaskStatus; newState: boolean }

export const dynamic = 'force-dynamic'

export async function PATCH(request: Request, context: { params: { uid: string; taskid: string } }) {
  const requestBody: Body = await request.json()
  const { uid, taskid } = context.params

  // ユーザーが存在するか確認
  try {
    await auth.getUser(uid)
  } catch (error) {
    return new Response('User not found', {
      status: 404,
    })
  }

  const taskRef = db.collection('users').doc(uid).collection('tasks').doc(taskid)
  const task = await taskRef.get()
  if (!task.exists) {
    return new Response('Task not found', {
      status: 404,
    })
  }
  const now = Date.now()
  const updateData = {
    [requestBody.status]: requestBody.newState,
    updatedAt: now,
  }
  await taskRef.update(updateData)

  const taskData = task.data() as Omit<Task, 'id'>
  const updatedTask: Task = { ...taskData, id: taskid, ...updateData }

  return new Response(JSON.stringify(updatedTask), {
    status: 200,
  })
}
