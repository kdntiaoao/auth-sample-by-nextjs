import { Todo } from '@/types'
import crypto from 'crypto'

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

// 新規TODOを作成する
export const POST = async (request: Request) => {
  const res: Pick<Todo, 'title' | 'description'> = await request.json()

  if (!res.title) {
    return new Response('Title is required', {
      status: 400,
    })
  }

  const now = Date.now()

  const todo: Todo = {
    id: crypto.randomUUID(),
    title: res.title,
    description: res.description || '',
    completed: false,
    deleted: false,
    createdAt: now,
    updatedAt: now,
  }

  console.log(todo)

  return new Response(JSON.stringify(todo), {
    status: 200,
  })
}
