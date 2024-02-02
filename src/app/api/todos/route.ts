import { Todo } from '@/types'
import { auth, db } from '@/lib/firebase/admin'

const DUMMY_TODOS: Todo[] = [
  {
    id: '1',
    title: 'title',
    description: 'description',
    completed: false,
    deleted: false,
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: '2',
    title: 'title',
    description: 'description',
    completed: false,
    deleted: false,
    createdAt: 0,
    updatedAt: 0,
  },
]

const TODOS_PER_PAGE = 10

export const dynamic = 'force-dynamic'

// TODO一覧を取得する
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') || 1)
  const todosAll: Todo[] = DUMMY_TODOS
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

  const result = {
    todos,
    page,
    totalTodos: todos.length,
    totalPages: 1,
  }

  return new Response(JSON.stringify(result), {
    status: 200,
  })
}

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
