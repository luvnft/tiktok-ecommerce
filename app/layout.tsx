import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body
          className={cn(
            'mx-auto min-h-screen max-w-[640px] font-sans antialiased',
            inter.variable,
            inter.className,
          )}
        >
          <div className="min-h-screen w-full">{children}</div>
        </body>
      </CartProvider>
    </html>
  )
}
