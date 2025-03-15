import { useFonts } from '@hooks/useFonts'
import { StatusBar, Text, View } from 'react-native'

export default function RootLayout() {
  const fontsLoaded = useFonts()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor="transparent" translucent />
      {fontsLoaded ? <Text>Home</Text> : <View />}
    </View>
  )
}
