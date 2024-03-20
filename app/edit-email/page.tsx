'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Loader2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { checkEmailExist, registerTiktok, updateUser } from '@/services/auth'
import { useNavigationContext } from '@/context/NavigationContext'
import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入正確的 Email 格式',
  }),
  password: z.string(),
})

function EditEmailPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [couldEditPassword, setCouldEditPassword] = useState(false)

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
      password: '',
    },
  })
  const email = form.watch('email')
  const password = form.watch('password')
  const errors = form.formState.errors

  async function handleUpdateUser(values: z.infer<typeof formSchema>) {
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
  }

  async function handleCheckEmailExist(values: z.infer<typeof formSchema>, dict: string) {
    try {
      const { resultcode, resultmessage } = await checkEmailExist(values.email, dict)

      if (resultcode === 0) {
        setCouldEditPassword(true)
        toast({
          description: 'Email 可以使用，請輸入密碼',
          className: 'bg-cyan-500 text-white',
        })
      } else {
        throw new Error(resultmessage)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `${error}`,
      })
    }
  }

  async function handleRegisterTiktok(values: z.infer<typeof formSchema>, dict: string) {
    if (!values.password) {
      toast({
        variant: 'destructive',
        description: '請輸入密碼',
      })
      setIsSubmitting(false)
      return
    }

    try {
      const { resultcode, resultmessage } = await registerTiktok({
        dict,
        name: user?.name || '',
        email: values.email,
        password: values.password,
      })

      if (resultcode === 0) {
        toast({
          description: '綁定成功',
          className: 'bg-cyan-500 text-white',
        })
        refreshUser()
        localStorage.removeItem('dict')
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
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dict = localStorage.getItem('dict')

    setIsSubmitting(true)

    if (dict) {
      if (!couldEditPassword) {
        await handleCheckEmailExist(values, dict)
      } else {
        await handleRegisterTiktok(values, dict)
      }
    } else {
      await handleUpdateUser(values)
    }

    setIsSubmitting(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4"></header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">請輸入您要綁定的資訊</span>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex w-full flex-col">
                        <label className="text-sm text-gray-500">電子信箱</label>
                        <div className="relative flex flex-1">
                          <Input
                            className=" rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-0 outline-none"
                            {...field}
                          />
                          {email && (
                            <div
                              className="absolute bottom-0 right-1 top-0 flex cursor-pointer items-center"
                              onClick={() => form.setValue('email', '')}
                            >
                              <XCircle
                                className="h-4 w-4 text-white md:h-6 md:w-6"
                                fill="#cccccc"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div
                      className={cn('flex flex-col items-end gap-1', {
                        hidden: !couldEditPassword,
                      })}
                    >
                      <div className="flex w-full flex-col">
                        <label className="text-sm text-gray-500">密碼</label>
                        <div className="relative flex flex-1">
                          <Input
                            className=" rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-0 outline-none"
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          />
                          {password && (
                            <div
                              className="absolute bottom-0 right-1 top-0 flex cursor-pointer items-center"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <EyeOff
                                  className="h-4 w-4 md:h-6 md:w-6"
                                  fill="#cccccc"
                                  stroke="#cccccc"
                                />
                              ) : (
                                <Eye
                                  className="-mr-[2px] h-[20px] w-[20px] md:-mr-1 md:h-[32px] md:w-[32px]"
                                  fill="#cccccc"
                                  stroke="#ffffff"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
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
