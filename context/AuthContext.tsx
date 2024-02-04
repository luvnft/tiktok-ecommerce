'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

type AuthContextType = {
  user: User | null
  token: string
  isLogin: boolean
  handleLogin: (user: User) => void
  handleLogout: (user: User) => void
}

type User = {
  id?: number
  tiktokid?: string
  lineid?: string
  online?: number
  domain_id?: number
  img?: string
  api_token?: string
  tel?: string
  name?: string
  mobile?: string
  password?: string
  email?: string
}

const useLogin = () => {
  const router = useRouter()
  const [token, setToken] = useState('')

  const isLogin = !!token
  const searchParams = useSearchParams()

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  useEffect(() => {
    if (code || state) {
      router.push('/')
      router.refresh()
    }
  }, [code, state, router])

  function resetToken() {
    setToken('')
  }

  return {
    isLogin,
    token,
    resetToken,
  }
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>({
    name: '曾喬丹',
    email: 'jordantseng1024@gmail.com',
  })
  const router = useRouter()
  const { isLogin, token, resetToken } = useLogin()

  const handleLogin = (user: User) => {
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    resetToken()
    router.push('/login')
  }

  console.log('token: ', token)

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLogin,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext)

  if (value == null) {
    throw new Error('useAuth cannot be used outside of AuthProvider')
  }

  return value
}
