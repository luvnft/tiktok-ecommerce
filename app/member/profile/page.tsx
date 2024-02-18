'use client'

import { ChevronRight, ExternalLink } from 'lucide-react'
import { useImmer } from 'use-immer'

import Title from '@/components/Title'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

function AvatarDemo({ src }: { src?: string }) {
  return (
    <Avatar className="h-12 w-12 border-2">
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-12 w-12" />
      </AvatarFallback>
    </Avatar>
  )
}

function Card() {
  return (
    <section className="flex items-center justify-between rounded-xl bg-white p-4">
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-foreground text-primary">
            家
          </span>
          <p>丟丟</p>
          <p>1580000000000</p>
        </span>
        <span className="text-gray-500">北京市海定區環大福苑西區 20 號 2 樓</span>
      </div>
      <ExternalLink className="text-gray-500" />
    </section>
  )
}

type LabelMap = {
  name: string
  id: string
  phone: string
  email: string
}

const labelMap: LabelMap = {
  name: '暱稱',
  id: '身分證字號',
  phone: '電話',
  email: 'E-mail',
}

const ProfilePage = () => {
  const { user } = useAuth()

  const [formValues, setFormValues] = useImmer<LabelMap>({
    name: '',
    id: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    if (!user) return

    setFormValues((draft) => {
      draft.name = user.name ?? ''
      draft.id = user.id.toString() ?? ''
      draft.phone = user.mobile ?? ''
      draft.email = user.email
    })
  }, [user, setFormValues])

  const fields = Object.entries(formValues) as [keyof LabelMap, string][]

  return (
    <main className="min-h-screen bg-default">
      <Title title="個人中心" goBackUrl="/member" />

      <div className="flex flex-col gap-4 p-4">
        <form className="flex w-full flex-col divide-y divide-secondary rounded-lg bg-white">
          <div className="flex items-center justify-between p-4 py-2">
            <span>頭像</span>
            <span className="flex items-center gap-2">
              {user ? (
                <AvatarDemo src={user.img ?? ''} />
              ) : (
                <Skeleton className="h-12 w-12 rounded-full" />
              )}
              <ChevronRight className="text-gray-500" />
            </span>
          </div>

          {fields.map(([key, value]) => (
            <div key={key} className="flex min-h-16 items-center justify-between p-4 py-2">
              <span>{labelMap[key]}</span>
              <span>{!user ? <Skeleton className="h-6 w-28" /> : value}</span>
            </div>
          ))}
        </form>

        <Card />
        <Card />
      </div>
    </main>
  )
}

export default ProfilePage
