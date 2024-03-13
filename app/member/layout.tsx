import { ReactNode } from 'react'

import { OrderProvider } from '@/context/OrderContext'
import { RecommendsProvider } from '@/context/RecommendsContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <RecommendsProvider>
      <OrderProvider>{children}</OrderProvider>
    </RecommendsProvider>
  )
}
