'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@/hooks/use-user'
import { useTodos } from '@/hooks/use-todos'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, '入力してください').max(100, '100文字以内で入力してください'),
  description: z.string().max(500, '500文字以内で入力してください'),
})

type FormSchema = z.infer<typeof formSchema>

export const TodoForm = () => {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: window.sessionStorage.getItem('title') || '',
      description: window.sessionStorage.getItem('description') || '',
    },
  })
  const [user] = useUser()
  const { addTodo } = useTodos()

  const submitting = form.formState.isSubmitting

  const saveStorage = (name: keyof FormSchema, value: string) => {
    window.sessionStorage.setItem(name, value)
  }

  const onSubmit = async (values: FormSchema) => {
    if (!user.data) return
    await addTodo(values.title, values.description)
    form.reset()
    window.sessionStorage.removeItem('title')
    window.sessionStorage.removeItem('description')
    router.replace('/')
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled={submitting}
                  onChange={(...args) => {
                    field.onChange(...args)
                    saveStorage(field.name, args[0].target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={submitting}
                  onChange={(...args) => {
                    field.onChange(...args)
                    saveStorage(field.name, args[0].target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={submitting} loadingText="Submitted...">
          Submit
        </Button>
      </form>
    </Form>
  )
}
