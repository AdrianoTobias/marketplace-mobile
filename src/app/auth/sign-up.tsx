import { router } from 'expo-router'
import { Center, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import Logo from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'
import { TouchableOpacity } from 'react-native'
import { User, Phone, Mail, KeyRound, MoveRight } from 'lucide-react-native'
import { useUserPhoto } from '@hooks/useUserPhoto'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const phoneRegex = /^\d{10,11}$/ // Entre 10 e 11 dígitos

const signUpFormSchema = z
  .object({
    fullName: z
      .string({
        required_error: 'Informe o seu nome completo',
      })
      .min(3, 'Informe o seu nome completo'),
    phone: z
      .string({
        required_error: 'Informe o seu telefone',
      })
      .regex(phoneRegex, 'Telefone inválido'),
    email: z
      .string({
        required_error: 'Informe o seu e-mail',
      })
      .email('E-mail inválido'),
    password: z
      .string({
        required_error: 'Informe uma senha',
      })
      .min(3, 'A senha deve ter pelo menos 3 caracteres'),
    passwordConfirmation: z
      .string({
        required_error: 'Confirme a senha',
      })
      .min(1, 'Confirme a senha'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não coincidem',
  })

type SignUpForm = z.infer<typeof signUpFormSchema>

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpFormSchema) })

  const { userPhoto, handleUserPhotoSelect } = useUserPhoto()

  function handleSignUp({
    fullName,
    phone,
    email,
    password,
    passwordConfirmation,
  }: SignUpForm) {
    console.log({ fullName, phone, email, password, passwordConfirmation })
  }

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

            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Nome"
                  id="fullName"
                  icon={User}
                  placeholder="Seu nome completo"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Telefone"
                  icon={Phone}
                  placeholder="(00) 00000-0000"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
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
                />
              )}
            />

            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Confirmar senha"
                  type="password"
                  icon={KeyRound}
                  placeholder="Confirme a senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.passwordConfirmation?.message}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />
          </VStack>

          <Button
            title="Cadastrar"
            icon={MoveRight}
            onPress={handleSubmit(handleSignUp)}
          />
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
