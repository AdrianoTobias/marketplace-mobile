import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '@services/api'
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@storage/storageAuthToken'
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

  async function sellerAndTokenUpdate(sellerData: SellerDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setSeller(sellerData)
  }

  async function storageSellerAndTokenSave(
    sellerData: SellerDTO,
    token: string,
  ) {
    setIsLoadingSellerStorageData(true)

    await storageSellerSave(sellerData)
    await storageAuthTokenSave(token)

    setIsLoadingSellerStorageData(false)
  }

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sellers/sessions', { email, password })

    if (data.accessToken) {
      const seller = {
        id: '1',
        name: 'Adriano',
        phone: '123456789',
        email: 'adriano@teste.com.br',
        avatar: '',
      }

      await storageSellerAndTokenSave(seller, data.accessToken)
      sellerAndTokenUpdate(seller, data.accessToken)
    }
  }

  async function signOut() {
    setIsLoadingSellerStorageData(true)

    setSeller({} as SellerDTO)
    await storageSellerRemove()
    await storageAuthTokenRemove()

    setIsLoadingSellerStorageData(false)
  }

  async function loadSellerData() {
    setIsLoadingSellerStorageData(true)

    const sellerLogged = await storageSellerGet()
    const token = await storageAuthTokenGet()

    if (token && sellerLogged) {
      sellerAndTokenUpdate(sellerLogged, token)
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
