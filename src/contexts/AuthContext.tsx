import { createContext, ReactNode, useState } from 'react'
import { router } from 'expo-router'
import { api } from '@services/api'
import { SellerDTO } from '@dtos/SellerDTO'

export type AuthContextDataProps = {
  seller: SellerDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [seller, setSeller] = useState<SellerDTO>({} as SellerDTO)

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sellers/sessions', { email, password })

    if (data.accessToken) {
      // setSeller(data.seller)
      setSeller({
        id: '1',
        name: 'Adriano',
        phone: '123456789',
        email: 'adriano@teste.com.br',
        avatar: '',
      })
      router.replace('/')
    }
  }

  async function signOut() {
    setSeller({} as SellerDTO)
    router.replace('/auth/sign-in')
  }

  return (
    <AuthContext.Provider value={{ seller, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
