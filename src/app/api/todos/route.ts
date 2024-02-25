import { Todo } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

type Body = Omit<Todo, 'completed' | 'deleted' | 'createdAt' | 'updatedAt'> & { uid: string }

// 新規TODOを作成する
export async function POST(request: Request) {
  const requestBody: Body = await request.json()
  const uid = requestBody.uid

  if (!requestBody.title) {
    return new Response('Title is required', {
      status: 400,
    })
  }

  if (!requestBody.id) {
    return new Response('ID is required', {
      status: 400,
    })
  }

  // ユーザーが存在するか確認
  try {
    await auth.getUser(uid)
  } catch (error) {
    return new Response('User not found', {
      status: 404,
    })
  }

  const now = Date.now()

  const todo: Omit<Todo, 'id'> = {
    title: requestBody.title,
    description: requestBody.description || '',
    completed: false,
    deleted: false,
    createdAt: now,
    updatedAt: now,
    deadline: requestBody.deadline,
  }

  await db.collection('users').doc(uid).collection('todos').doc(requestBody.id).set(todo)

  const newTodo: Todo = { ...todo, id: requestBody.id }

  return new Response(JSON.stringify(newTodo), {
    status: 200,
  })
}
