import { Stack } from 'expo-router'
import { useAuth } from '@hooks/useAuth'
import SignInScreen from '@app/auth/sign-in'

export default function PrivateLayout() {
  const { seller } = useAuth()

  return seller.id ? (
    <Stack screenOptions={{ headerShown: false }} />
  ) : (
    <SignInScreen />
  )
}
