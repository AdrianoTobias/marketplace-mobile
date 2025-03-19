import { router } from 'expo-router'
import { Center, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import Logo from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'
import { User, Phone, Mail, KeyRound, MoveRight } from 'lucide-react-native'

export default function SignUpScreen() {
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
            <UserPhoto width={120} height={120} alt="Imagem do usuário" />
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
