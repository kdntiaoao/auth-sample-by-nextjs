import { Todo } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

type Body = Pick<Todo, 'title' | 'description'> & { uid: string }

// 新規TODOを作成する
export async function POST(request: Request) {
  const requestBody: Body = await request.json()
  const uid = requestBody.uid

  if (!requestBody.title) {
    return new Response('Title is required', {
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
  }

  const res = await db.collection('users').doc(uid).collection('todos').add(todo)

  return new Response(JSON.stringify({ ...todo, id: res.id }), {
    status: 200,
  })
}
