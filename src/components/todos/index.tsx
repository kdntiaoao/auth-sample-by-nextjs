'use client'

import { useTodos } from '@/hooks/use-todos'
import { useState } from 'react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TodosItem } from '../todos-item'
import { set } from 'date-fns'

export const Todos = () => {
  const { todos, error, loading, changeStatus } = useTodos()
  const [hiddenTodosUncompleted, setHiddenTodosUncompleted] = useState<string[]>([])
  const [hiddenTodosCompleted, setHiddenTodosCompleted] = useState<string[]>([])

  const todosUncompleted = todos.filter((todo) => !todo.completed && !todo.deleted)
  const todosCompleted = todos.filter((todo) => todo.completed && !todo.deleted)

  const changeCompletedStatus = (id: string, checked: boolean) => {
    const todo = todos.find((todo) => todo.id === id)

    changeStatus(id, 'completed', checked)

    if (checked) {
      const title = todo?.title && todo.title.length > 10 ? todo?.title.slice(0, 10) + '...' : todo?.title || 'タスク'
      toast['success'](`「${title}」を完了にしました`, {
        action: {
          label: '元に戻す',
          onClick: () => changeCompletedStatus(id, !checked),
        },
      })
    }

    if (checked) {
      setHiddenTodosUncompleted((prev) => [...prev, id])
      setHiddenTodosCompleted((prev) => prev.filter((todoId) => todoId !== id))
    } else {
      setHiddenTodosUncompleted((prev) => prev.filter((todoId) => todoId !== id))
      setHiddenTodosCompleted((prev) => [...prev, id])
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (todos.length === 0 || error) {
    return <p>No todos found.</p>
  }

  console.log(hiddenTodosUncompleted)

  return (
    <Tabs defaultValue="todo">
      <TabsList>
        <TabsTrigger value="todo">To Do</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="todo">
        <ul>
          {todosUncompleted.map((todo) => (
            <TodosItem
              key={todo.id}
              todo={todo}
              hidden={hiddenTodosUncompleted.includes(todo.id)}
              onCheckedChange={(checked) => changeCompletedStatus(todo.id, checked)}
            />
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="completed">
        <ul>
          {todosCompleted.map((todo) => (
            <TodosItem
              key={todo.id}
              todo={todo}
              hidden={hiddenTodosCompleted.includes(todo.id)}
              onCheckedChange={(checked) => changeCompletedStatus(todo.id, checked)}
            />
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  )
}
