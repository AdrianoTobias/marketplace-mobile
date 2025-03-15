import { useFonts } from '@hooks/useFonts'
import { StatusBar, View } from 'react-native'
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'

export default function RootLayout() {
  const fontsLoaded = useFonts()

  return (
    <GluestackUIProvider config={config}>
      <StatusBar backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <Center flex={1} bg="$background">
          <Text fontSize={'$title_md'}>Home</Text>
        </Center>
      ) : (
        <View />
      )}
    </GluestackUIProvider>
  )
}
