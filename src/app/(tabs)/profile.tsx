import { Center, Icon, ScrollView, Text, View } from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'
import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { LogOut, User, Phone, Mail, KeyRound } from 'lucide-react-native'

export default function ProfileScreen() {
  function handleLogOut() {}

  function handleUpdateProfile() {}

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View flex={1} bg={'$background'}>
        <View position="relative">
          <Center mt="$16" mb="$8">
            <UserPhoto width={120} height={120} alt="Imagem do usuário" />
            <View position="absolute" top={0} right={24}>
              <TouchableOpacity onPress={handleLogOut}>
                <View
                  borderWidth={1}
                  borderColor="$redDanger"
                  borderRadius={10}
                  p="$2"
                >
                  <Icon as={LogOut} color="$redDanger" size="xl" />
                </View>
              </TouchableOpacity>
            </View>
          </Center>
        </View>

        <View flex={1} px={'$10'} pb={'$4'} gap={'$5'}>
          <Center gap={'$5'}>
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

          <View gap="$5">
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
              label="Senha atual"
              id="currentPassword"
              type="password"
              icon={KeyRound}
              placeholder="Sua senha"
              secureTextEntry
            />
            <Input
              label="Nova senha"
              id="newPassword"
              type="password"
              icon={KeyRound}
              placeholder="Sua nova senha"
              secureTextEntry
            />
            <Input
              label="Confirmar nova senha"
              id="newPasswordConfirmation"
              type="password"
              icon={KeyRound}
              placeholder="Confirme sua nova senha"
              secureTextEntry
            />
          </View>

          <Button title="Atualizar cadastro" onPress={handleUpdateProfile} />
        </View>
      </View>
    </ScrollView>
  )
}
