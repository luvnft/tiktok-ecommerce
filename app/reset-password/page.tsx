'use client'

import { useState } from 'react'
import { ChevronRight, Eye, EyeOff, Loader2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  password: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
  passwordAgain: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
})

const ResetPasswordPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { handleLogin } = useAuthContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordAgain: '',
    },
  })

  const password = form.watch('password')
  const passwordAgain = form.watch('passwordAgain')
  const errors = form.formState.errors

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    // handleLogin(values)
    //   .catch((error: string) => {
    //     toast({
    //       variant: 'destructive',
    //       description: error.toString(),
    //     })
    //   })
    //   .finally(() => {
    //     setIsSubmitting(false)
    //   })
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">重新設定密碼</span>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div>
                      <div className="relative flex">
                        <Input
                          className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                          placeholder="請輸入密碼"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        {password && (
                          <div
                            className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center"
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
                      {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordAgain"
                  render={({ field }) => (
                    <div>
                      <div className="relative flex">
                        <Input
                          className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                          placeholder="再輸入一次新密碼"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        {passwordAgain && (
                          <div
                            className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center"
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
                      {errors.passwordAgain && (
                        <FormMessage>{errors.passwordAgain.message}</FormMessage>
                      )}
                    </div>
                  )}
                />
              </div>

              <Button
                disabled={!passwordAgain || !password || isSubmitting}
                type="submit"
                variant="primary"
                className="rounded-full"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : '確定'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordPage
