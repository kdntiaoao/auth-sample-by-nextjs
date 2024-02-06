'use client'

import { Todo } from '@/types'
import clsx from 'clsx'
import styles from './index.module.css'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { useEffect, useRef } from 'react'

type Props = {
  todo: Todo
  hidden?: boolean
  onCheckedChange: (checked: boolean) => void
}

export const TodosItem = ({ todo, hidden, onCheckedChange }: Props) => {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = `${ref.current.clientHeight}px`
  }, [ref])

  return (
    <li
    ref={ref}
      data-todo={todo.id}
      className={clsx(
        'mb-2 overflow-hidden transition-all duration-300',
        hidden && 'delay-200',
        hidden && styles.shrink,
      )}
    >
      <div
        className={clsx(
          'flex gap-2 rounded-md border border-slate-200 p-4 transition-all duration-200',
          !hidden && 'delay-300',
          hidden && 'opacity-0 delay-0',
        )}
      >
        <div>
          <Checkbox
            id={todo.id}
            defaultChecked={todo.completed}
            onCheckedChange={onCheckedChange}
          />
        </div>
        <label htmlFor={todo.id} className="grid flex-1 gap-2">
          <span className="break-words font-bold">{todo.title}</span>
          <span className="text-sm">
            created at: {format(new Date(todo.createdAt), 'yyyy-MM-dd HH:mm:ss')}
            <br />
            updated at: {format(new Date(todo.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
          </span>
          {todo.description && <span className="break-words text-sm">{todo.description}</span>}
        </label>
      </div>
    </li>
  )
}
