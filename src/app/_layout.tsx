import { useFonts } from '@hooks/useFonts'
import { StatusBar } from 'react-native'
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'
import { Loading } from '@components/Loading'

export default function RootLayout() {
  const fontsLoaded = useFonts()

  return (
    <GluestackUIProvider config={config}>
      <StatusBar backgroundColor="transparent" translucent />
      <Center flex={1} bg="$background">
        {fontsLoaded ? <Text fontSize={'$title_md'}>Home</Text> : <Loading />}
      </Center>
    </GluestackUIProvider>
  )
}
