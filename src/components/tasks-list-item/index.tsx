'use client'

import { Task } from '@/types'
import clsx from 'clsx'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  task: Task
  hidden?: boolean
  onCheckedChange: (checked: boolean) => void
  onDelete: () => void
}

export const TasksListItem = ({ task, hidden, onCheckedChange, onDelete }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (!ref.current) return
    setHeight(`${ref.current.offsetHeight}px`)
  }, [ref])

  return (
    <li
      className={clsx('mb-2 overflow-hidden transition-all duration-300', hidden && 'mb-0 opacity-0')}
      style={{ height: hidden ? 0 : height }}
    >
      <div ref={ref} className="flex gap-4 rounded-md border border-slate-200 p-4">
        <div className="flex flex-1 items-start gap-2">
          {!task.deleted && (
            <label className="relative block before:absolute before:-inset-2 before:block">
              <Checkbox id={task.id} checked={task.completed} onCheckedChange={onCheckedChange} />
            </label>
          )}
          <div className="grid flex-1 gap-2">
            <span className="break-words font-bold">{task.title}</span>
            <span className="text-sm">
              created at: {format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm:ss')}
              <br />
              updated at: {format(new Date(task.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
              <br />
              deadline: {format(new Date(task.deadline), 'yyyy-MM-dd HH:mm')}
            </span>
            {task.description && <span className="break-words text-sm">{task.description}</span>}
          </div>
        </div>
        {!task.deleted && (
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </li>
  )
}
