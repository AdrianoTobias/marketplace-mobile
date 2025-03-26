import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '@services/api'
import { SellerDTO } from '@dtos/SellerDTO'
import {
  storageSellerGet,
  storageSellerRemove,
  storageSellerSave,
} from '@storage/storageSeller'

export type AuthContextDataProps = {
  seller: SellerDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingSellerStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [seller, setSeller] = useState<SellerDTO>({} as SellerDTO)
  const [isLoadingSellerStorageData, setIsLoadingSellerStorageData] =
    useState(true)

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sellers/sessions', { email, password })

    if (data.accessToken) {
      // setSeller(data.seller)
      // storageSellerSave(data.seller)
      const seller = {
        id: '1',
        name: 'Adriano',
        phone: '123456789',
        email: 'adriano@teste.com.br',
        avatar: '',
      }

      setSeller(seller)
      storageSellerSave(seller)
    }
  }

  async function signOut() {
    setIsLoadingSellerStorageData(true)

    setSeller({} as SellerDTO)
    await storageSellerRemove()

    setIsLoadingSellerStorageData(false)
  }

  async function loadSellerData() {
    const sellerLogged = await storageSellerGet()

    if (sellerLogged) {
      setSeller(sellerLogged)
    }

    setIsLoadingSellerStorageData(false)
  }

  useEffect(() => {
    loadSellerData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ seller, signIn, signOut, isLoadingSellerStorageData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
