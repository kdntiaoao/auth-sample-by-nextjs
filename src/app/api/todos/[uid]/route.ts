import type { Todo, TodosResult } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

const TODOS_PER_PAGE = 10

export const dynamic = 'force-dynamic'

// TODO一覧を取得する
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

  const todosRef = db.collection('users').doc(uid).collection('todos')
  const snapshot = await todosRef.get()

  const todosAll: Todo[] = []
  snapshot.forEach((doc) => {
    todosAll.push({ id: doc.id, ...doc.data() } as Todo)
  })
  // todosAll.sort((a, b) => b.updatedAt - a.updatedAt)
  todosAll.sort((a, b) => a.deadline.localeCompare(b.deadline))

  const totalTodos = todosAll.length
  const totalPages = Math.ceil(totalTodos / TODOS_PER_PAGE) || 1

  if (page > totalPages) {
    return new Response(
      JSON.stringify({
        todos: [],
        page,
        totalTodos,
        totalPages,
      }),
      {
        status: 200,
      },
    )
  }

  const todos = todosAll.slice((page - 1) * TODOS_PER_PAGE, page * TODOS_PER_PAGE)

  const result: TodosResult = {
    todos,
    page,
    totalTodos: todos.length,
    totalPages: 1,
  }

  return new Response(JSON.stringify(result), {
    status: 200,
  })
}
