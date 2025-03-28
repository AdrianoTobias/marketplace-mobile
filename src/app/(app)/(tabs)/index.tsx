import { router, useFocusEffect } from 'expo-router'
import { useState, useCallback } from 'react'
import { TouchableOpacity, FlatList } from 'react-native'
import { Icon, Text, useToast, View } from '@gluestack-ui/themed'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { ProductCard } from '@components/ProductCard'
import { Loading } from '@components/Loading'
import { Modal } from '@components/Modal'
import { ToastMessage } from '@components/ToastMessage'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { MoveRight, Search, Filter, User } from 'lucide-react-native'
import { ProductDTO } from '@dtos/ProductDTO'

export default function ProductsScreen() {
  const {
    sellerLogged: { seller },
  } = useAuth()

  const [modalVisible, setModalVisible] = useState(false)

  const toast = useToast()

  const [products, setProducts] = useState<ProductDTO[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  async function fecthProducts() {
    try {
      setIsLoadingProducts(true)

      const response = await api.get<{ products: ProductDTO[] }>('/products')
      setProducts(response.data?.products)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os produtos!'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoadingProducts(false)
    }
  }

  function handleProfile() {
    router.navigate('/(app)/(tabs)/profile')
  }

  function handleFilter() {
    setModalVisible(true)
  }

  useFocusEffect(
    useCallback(() => {
      fecthProducts()
    }, []),
  )

  return (
    <View flex={1} gap={'$3'} bg={'$background'}>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} />

      <View
        pt="$16"
        px={'$6'}
        pb={'$6'}
        gap={'$8'}
        bg="$white"
        borderRadius={20}
      >
        <View flexDirection="row" gap={20}>
          {seller.avatar ? (
            <UserPhoto
              source={seller.avatar.url}
              width={56}
              height={56}
              alt="Imagem do usuário"
            />
          ) : (
            <View
              width={56}
              height={56}
              rounded={12}
              backgroundColor="$shape"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={User} size="xl" color="$orangeBase" />
            </View>
          )}

          <View gap={4} justifyContent="center">
            <Text color="$gray500" fontFamily="$heading" fontSize={'$title_sm'}>
              Olá, {seller.name}!
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

            <TouchableOpacity onPress={handleFilter}>
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

      {isLoadingProducts ? (
        <Loading />
      ) : (
        <View flex={1} mx={'6%'}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                onPress={() => router.push(`/product/${item.id}`)}
                data={item}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{
              gap: '8%',
              width: '40%',
              marginBottom: 8,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  )
}
