import { useFonts } from '@hooks/useFonts'
import { StatusBar } from 'react-native'
import { Center, GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'
import { Loading } from '@components/Loading'

import SignInScreen from '@app/auth/sign-in'

export default function RootLayout() {
  const fontsLoaded = useFonts()

  return (
    <GluestackUIProvider config={config}>
      <StatusBar backgroundColor="transparent" translucent />
      <Center flex={1} bg="$background">
        {fontsLoaded ? <SignInScreen /> : <Loading />}
      </Center>
    </GluestackUIProvider>
  )
}
