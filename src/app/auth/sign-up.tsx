import { router } from 'expo-router'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import Logo from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'
import { ToastMessage } from '@components/ToastMessage'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { User, Phone, Mail, KeyRound, MoveRight } from 'lucide-react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

export default function SignUpScreen() {
  const [userPhoto, setUserPhoto] = useState('')

  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoUri = photoSelected.assets[0].uri

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="info"
                title="Essa imagem é muito grande. Escolha uma de até 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleSignUp() {}

  function handleSignIn() {
    router.navigate('/')
  }

  return (
    <ScrollView width={'$full'} showsVerticalScrollIndicator={false}>
      <VStack flex={1} width={'$full'} bg="$white">
        <Center mt="$16" mb="$8" gap={'$8'} px="$10">
          <Logo width={64} height={48} />

          <Center gap={'$1'}>
            <Heading color="$gray500" fontSize="$title_lg">
              Crie sua conta
            </Heading>

            <Text
              color="$gray300"
              fontSize={'$body_sm'}
              lineHeight={'$body_sm'}
              textAlign="center"
            >
              Informe os seus dados pessoais e de acesso
            </Text>
          </Center>
        </Center>

        <VStack flex={1} px={'$10'} gap={'$10'}>
          <Center gap="$5">
            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <UserPhoto
                width={120}
                height={120}
                source={userPhoto && { uri: userPhoto }}
                alt="Imagem do usuário"
              />
            </TouchableOpacity>
            <Input
              label="Nome"
              id="name"
              icon={User}
              placeholder="Seu nome completo"
            />
            <Input
              label="Telefone"
              id="phone"
              icon={Phone}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
            />
          </Center>

          <VStack gap="$5">
            <Text
              color="$gray500"
              fontFamily="$heading"
              fontSize={'$title_sm'}
              lineHeight={'$title_sm'}
            >
              Acesso
            </Text>

            <Input
              label="E-mail"
              id="mail"
              icon={Mail}
              placeholder="mail@exemplo.br"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              icon={KeyRound}
              placeholder="Sua senha"
              secureTextEntry
            />
            <Input
              label="Confirmar senha"
              id="passwordConfirmation"
              type="password"
              icon={KeyRound}
              placeholder="Confirme a senha"
              secureTextEntry
            />
          </VStack>

          <Button title="Cadastrar" icon={MoveRight} onPress={handleSignUp} />
        </VStack>

        <VStack flex={1} px={'$10'} gap={20} marginTop={70} marginBottom="$10">
          <Text color="$gray300" fontSize={'$body_md'}>
            Já tem uma conta?
          </Text>

          <Button
            title="Acessar"
            icon={MoveRight}
            variant="outline"
            onPress={handleSignIn}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
