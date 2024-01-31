'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useUser } from '@/hooks/use-user'

const formSchema = z.object({
  title: z.string().min(1, '入力してください').max(100, '100文字以内で入力してください'),
  description: z.string().max(500, '500文字以内で入力してください'),
})

type FormSchema = z.infer<typeof formSchema>

export const TodoForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const [user] = useUser()

  const onSubmit = async (values: FormSchema) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(values),
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
