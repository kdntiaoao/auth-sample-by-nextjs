import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debugLog: typeof console.log & {
  object: (obj: Record<PropertyKey, unknown>) => void
  client: typeof console.log
  server: typeof console.log
} = (...args) => {
  if (process.env.NODE_ENV === 'production') return
  console.log(...args)
}

debugLog.object = (obj) => {
  debugLog(JSON.stringify(obj, null, 2))
}

debugLog.client = (...args) => {
  if (typeof window === 'undefined') return
  console.log(...args)
}

debugLog.server = (...args) => {
  if (typeof window !== 'undefined') return
  console.log(...args)
}
