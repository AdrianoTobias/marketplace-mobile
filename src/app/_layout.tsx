import { useFonts } from '@hooks/useFonts'
import { StatusBar, View } from 'react-native'
import { GluestackUIProvider, Text } from '@gluestack-ui/themed'

export default function RootLayout() {
  const fontsLoaded = useFonts()

  return (
    <GluestackUIProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar backgroundColor="transparent" translucent />
        {fontsLoaded ? <Text>Home</Text> : <View />}
      </View>
    </GluestackUIProvider>
  )
}
