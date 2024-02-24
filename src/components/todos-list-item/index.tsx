'use client'

import { Todo } from '@/types'
import clsx from 'clsx'
import styles from './index.module.css'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  todo: Todo
  hidden?: boolean
  onCheckedChange: (checked: boolean) => void
  onDelete: () => void
}

export const TodosListItem = ({ todo, hidden, onCheckedChange, onDelete }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (!ref.current) return
    setHeight(`${ref.current.offsetHeight}px`)
  }, [ref])

  return (
    <li
      data-todo={todo.id}
      className={clsx(
        'mb-2 overflow-hidden transition-all duration-300',
        hidden && 'delay-200',
        hidden && styles.shrink,
      )}
      style={{ height }}
    >
      <div
        ref={ref}
        className={clsx(
          'flex gap-4 rounded-md border border-slate-200 p-4 transition-all duration-200',
          !hidden && 'delay-300',
          hidden && 'opacity-0 delay-0',
        )}
      >
        <div className="flex flex-1 items-start gap-2">
          {!todo.deleted && (
            <label className="relative block before:absolute before:-inset-2 before:block">
              <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={onCheckedChange} />
            </label>
          )}
          <div className="grid flex-1 gap-2">
            <span className="break-words font-bold">{todo.title}</span>
            <span className="text-sm">
              created at: {format(new Date(todo.createdAt), 'yyyy-MM-dd HH:mm:ss')}
              <br />
              updated at: {format(new Date(todo.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
              <br />
              deadline: {format(new Date(todo.deadline), 'yyyy-MM-dd HH:mm')}
            </span>
            {todo.description && <span className="break-words text-sm">{todo.description}</span>}
          </div>
        </div>
        {!todo.deleted && (
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </li>
  )
}
