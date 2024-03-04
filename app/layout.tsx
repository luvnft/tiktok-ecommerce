import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { AddressProvider } from '@/context/AddressContext'
import { WebSettingsProvider } from '@/context/WebSettingsContext'
import { Toaster } from '@/components/ui/toaster'
import { RecommendsProvider } from '@/context/RecommendsContext'
import { getWebSettings } from '@/services/webSettings'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const { data } = await getWebSettings()

  return {
    title: data.title,
    description: data.description,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <WebSettingsProvider>
        <AuthProvider>
          <CartProvider>
            <AddressProvider>
              <RecommendsProvider>
                <body
                  className={cn('bg-black font-sans antialiased', inter.variable, inter.className)}
                >
                  <div className="mx-auto min-h-screen w-full max-w-md">{children}</div>
                  <Toaster />
                </body>
              </RecommendsProvider>
            </AddressProvider>
          </CartProvider>
        </AuthProvider>
      </WebSettingsProvider>
    </html>
  )
}
