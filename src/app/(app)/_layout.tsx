import { Stack } from 'expo-router'
import { useAuth } from '@hooks/useAuth'
import SignInScreen from '@app/auth/sign-in'
import { Loading } from '@components/Loading'

export default function PrivateLayout() {
  const { seller, isLoadingSellerStorageData } = useAuth()

  if (isLoadingSellerStorageData) {
    return <Loading />
  }

  return seller.id ? (
    <Stack screenOptions={{ headerShown: false }} />
  ) : (
    <SignInScreen />
  )
}
