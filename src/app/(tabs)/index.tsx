import { Text, View } from '@gluestack-ui/themed'

export default function ProductsScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text color="$gray300" fontSize={'$body_md'}>
        Produtos
      </Text>
    </View>
  )
}
