'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const formSchema = z.object({
  name: z.string().min(1, { message: '姓名為必填' }),
  tel: z.string().min(1, { message: '電話為必填' }),
  city1: z.string(),
  city2: z.string(),
  address: z.string().min(1, { message: '地址為必填' }),
  CVSStoreName: z.string(),
  CVSAddress: z.string(),
})

type Props = {
  cities: string[]
  districts: string[]
  onGetDistrict: (val: string) => void
}

const ReceiptForm = ({ cities = [], districts = [], onGetDistrict }: Props) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tel: '',
      city1: '',
      city2: '',
      address: '',
      CVSStoreName: '',
      CVSAddress: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>*收件人</FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>*電話</FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>縣市</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val)
                  onGetDistrict(val)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="請選擇..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full bg-white">
                  {cities.map((opt, index) => (
                    // TODO: temp key
                    <SelectItem key={index} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>鄉鎮區</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="請選擇..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full bg-white">
                  {districts.map((opt, index) => (
                    // TODO: temp key
                    <SelectItem key={index} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>*地址</FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CVSStoreName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>店家名稱</FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CVSAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>店家地址</FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-15 flex w-full rounded-3xl">
          新增
        </Button>
      </form>
    </Form>
  )
}

export default ReceiptForm
