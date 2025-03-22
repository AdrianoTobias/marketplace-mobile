import { router } from 'expo-router'
import { TouchableOpacity, FlatList } from 'react-native'
import { Icon, Text, View } from '@gluestack-ui/themed'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { ProductCard } from '@components/ProductCard'
import { MoveRight, Search, Filter } from 'lucide-react-native'

export default function ProductsScreen() {
  const products = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  function handleProfile() {
    router.navigate('/(tabs)/profile')
  }

  return (
    <View flex={1} gap={'$3'}>
      <View
        pt="$16"
        px={'$6'}
        pb={'$6'}
        gap={'$8'}
        bg="$white"
        borderRadius={20}
      >
        <View flexDirection="row" gap={20}>
          <UserPhoto width={56} height={56} alt="Imagem do usuário" />

          <View gap={4} justifyContent="center">
            <Text color="$gray500" fontFamily="$heading" fontSize={'$title_sm'}>
              Olá, Adriano!
            </Text>

            <TouchableOpacity onPress={handleProfile}>
              <View flexDirection="row" gap={'$2'}>
                <Text
                  color="$orangeBase"
                  fontFamily="$action"
                  fontSize={'$action_sm'}
                >
                  Ver perfil
                </Text>

                <Icon as={MoveRight} color="$orangeBase" size={'lg'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View gap={4}>
          <Text color="$gray500" fontFamily="$body" fontSize={'$body_sm'}>
            Explore produtos
          </Text>

          <View flexDirection="row" gap={'$4'} alignItems="flex-end">
            <View flex={1}>
              <Input id="search" icon={Search} placeholder="Pesquisar" />
            </View>

            <TouchableOpacity>
              <View
                borderWidth={1}
                borderColor="$orangeBase"
                borderRadius={10}
                p="$2"
              >
                <Icon as={Filter} color="$orangeBase" size={'md'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View flex={1} mx={'6%'}>
        <FlatList
          data={products}
          keyExtractor={(item) => item}
          renderItem={() => <ProductCard />}
          numColumns={2}
          columnWrapperStyle={{
            gap: '8%',
            width: '40%',
            marginBottom: 8,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
