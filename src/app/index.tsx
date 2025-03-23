import { router } from 'expo-router'
import { Center, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Mail, KeyRound, MoveRight } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const signInFormSchema = z.object({
  email: z
    .string({
      required_error: 'Informe o seu e-mail',
    })
    .email('E-mail inválido'),
  password: z
    .string({
      required_error: 'Informe a senha',
    })
    .min(1, 'Informe a senha'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: zodResolver(signInFormSchema) })

  function handleSignIn({ email, password }: SignInForm) {
    console.log({ email, password })
    router.replace('/(tabs)')
  }

  function handleSignUp() {
    router.navigate('/auth/sign-up')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="E-mail"
                  icon={Mail}
                  placeholder="mail@exemplo.br"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Senha"
                  type="password"
                  icon={KeyRound}
                  placeholder="Sua senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />
          </Center>

          <Button
            title="Acessar"
            icon={MoveRight}
            onPress={handleSubmit(handleSignIn)}
          />
        </VStack>

        <VStack
          flex={1}
          px={'$10'}
          gap={20}
          justifyContent="flex-end"
          marginTop={80}
          marginBottom="$10"
        >
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
