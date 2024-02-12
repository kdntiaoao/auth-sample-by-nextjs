import type { Todo, TodoStatus } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

type Body = { status: TodoStatus; newState: boolean }

export const dynamic = 'force-dynamic'

export async function PATCH(request: Request, context: { params: { uid: string; todoid: string } }) {
  const requestBody: Body = await request.json()
  const { uid, todoid } = context.params

  // ユーザーが存在するか確認
  try {
    await auth.getUser(uid)
  } catch (error) {
    return new Response('User not found', {
      status: 404,
    })
  }

  const todoRef = db.collection('users').doc(uid).collection('todos').doc(todoid)
  const todo =
    await todoRef.get()
  if (!todo.exists) {
    return new Response('Todo not found', {
      status: 404,
    })
  }
  const updateData = {
    [requestBody.status]: requestBody.newState,
  }
  await todoRef.update(updateData)

  const todoData = todo.data() as Omit<Todo, 'id'>
  const updatedTodo: Todo = { ...todoData, id: todoid, ...updateData }

  return new Response(JSON.stringify(updatedTodo), {
    status: 200,
  })
}
