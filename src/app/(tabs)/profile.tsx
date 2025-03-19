import { Text, View } from '@gluestack-ui/themed'

export default function ProfileScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text color="$gray300" fontSize={'$body_md'}>
        Perfil
      </Text>
    </View>
  )
}
