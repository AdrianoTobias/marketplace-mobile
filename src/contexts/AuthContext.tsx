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
import { ToastMessage } from '@components/ToastMessage'
import { AppError } from '@utils/AppError'
import { useToast } from '@gluestack-ui/themed'

export type AuthContextDataProps = {
  sellerLogged: SellerDTO
  updateSellerLogged: (sellerLoggedUpdated: SellerDTO) => Promise<void>
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
  const [sellerLogged, setSellerLogged] = useState<SellerDTO>({} as SellerDTO)
  const [isLoadingSellerStorageData, setIsLoadingSellerStorageData] =
    useState(true)

  const toast = useToast()

  async function authTokenUpdate(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function storageSellerAndTokenSave(seller: SellerDTO, token: string) {
    setIsLoadingSellerStorageData(true)

    await storageSellerSave(seller)
    await storageAuthTokenSave(token)

    setIsLoadingSellerStorageData(false)
  }

  async function getSellerProfile() {
    const response = await api.get<{ seller: SellerDTO }>('/sellers/me')
    return response.data
  }

  async function updateSellerLogged(sellerLoggedUpdated: SellerDTO) {
    setSellerLogged(sellerLoggedUpdated)
    await storageSellerSave(sellerLoggedUpdated)
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sellers/sessions', { email, password })

      const token = data.accessToken

      if (token) {
        await authTokenUpdate(token)

        const { seller } = await getSellerProfile()

        setSellerLogged(seller)
        await storageSellerAndTokenSave(seller, token)
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o perfil!'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function signOut() {
    setIsLoadingSellerStorageData(true)

    setSellerLogged({} as SellerDTO)
    await storageSellerRemove()
    await storageAuthTokenRemove()

    setIsLoadingSellerStorageData(false)
  }

  async function loadSellerData() {
    setIsLoadingSellerStorageData(true)

    const sellerLogged = await storageSellerGet()
    const token = await storageAuthTokenGet()

    if (token && sellerLogged) {
      authTokenUpdate(token)
      setSellerLogged(sellerLogged)
    }

    setIsLoadingSellerStorageData(false)
  }

  useEffect(() => {
    loadSellerData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        sellerLogged,
        updateSellerLogged,
        signIn,
        signOut,
        isLoadingSellerStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
