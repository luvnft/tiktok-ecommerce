'use client'

import { useEffect, useState } from 'react'
import { Loader2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { updateUser } from '@/services/auth'
import { useNavigationContext } from '@/context/NavigationContext'
import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入正確的 Email 格式',
  }),
})

function EditEmailPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { from } = useNavigationContext()
  const { token, user, refreshUser } = useAuthContext()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })
  const email = form.watch('email')
  const errors = form.formState.errors

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const { resultcode, resultmessage } = await updateUser({
        email: values.email,
        name: user?.name,
      })

      if (resultcode === 0) {
        toast({
          description: '更新成功',
          className: 'bg-cyan-500 text-white',
        })
        refreshUser()
        router.push(from || '/')
      } else {
        throw new Error(resultmessage)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `${error}`,
      })
    }
    setIsSubmitting(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4"></header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">請輸入您要註冊的 Email</span>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <div className="relative flex">
                        <Input
                          className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                          placeholder="請輸入 Email"
                          {...field}
                        />
                        {email && (
                          <div
                            className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center"
                            onClick={() => form.setValue('email', '')}
                          >
                            <XCircle className="h-4 w-4 text-white md:h-6 md:w-6" fill="#cccccc" />
                          </div>
                        )}
                      </div>
                      {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                    </div>
                  )}
                />
              </div>

              <Button
                disabled={!email || isSubmitting}
                type="submit"
                variant="primary"
                className="rounded-full"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : '確認'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default EditEmailPage