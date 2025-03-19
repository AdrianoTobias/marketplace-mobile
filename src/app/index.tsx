import { router } from 'expo-router'
import { Center, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Mail, KeyRound, MoveRight } from 'lucide-react-native'

export default function SignInASDScreen() {
  function handleSignIn() {
    router.replace('/(tabs)')
  }

  function handleSignUp() {
    router.navigate('/auth/sign-up')
  }

  return (
    <ScrollView width={'$full'} showsVerticalScrollIndicator={false}>
      <VStack flex={1} width={'$full'} bg="$white">
        <Center my="$16" gap={'$8'}>
          <Logo width={64} height={48} />

          <Center gap={'$1'}>
            <Heading color="$gray500" fontSize="$title_lg">
              Acesse sua conta
            </Heading>

            <Text
              color="$gray300"
              fontSize={'$body_sm'}
              lineHeight={'$body_sm'}
            >
              Informe seu e-mail e senha para entrar
            </Text>
          </Center>
        </Center>

        <VStack flex={1} px={'$10'} gap={'$10'}>
          <Center gap="$5">
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
          </Center>

          <Button title="Acessar" icon={MoveRight} onPress={handleSignIn} />
        </VStack>

        <VStack flex={1} px={'$10'} gap={20} marginTop={140} marginBottom="$2">
          <Text color="$gray300" fontSize={'$body_md'}>
            Ainda não tem uma conta?
          </Text>

          <Button
            title="Cadastrar"
            icon={MoveRight}
            variant="outline"
            onPress={handleSignUp}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
