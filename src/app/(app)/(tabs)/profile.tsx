import { Center, Icon, ScrollView, Text, View } from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'
import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useUserPhoto } from '@hooks/useUserPhoto'
import { LogOut, User, Phone, Mail, KeyRound } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const phoneRegex = /^\d{10,11}$/ // Entre 10 e 11 dígitos

const profileFormSchema = z
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
        required_error: 'Informe a senha atual',
      })
      .min(1, 'Informe a senha atual'),
    newPassword: z
      .string({
        required_error: 'Informe a nova senha',
      })
      .min(3, 'A nova senha deve ter pelo menos 3 caracteres'),
    newPasswordConfirmation: z
      .string({
        required_error: 'Confirme a nova senha',
      })
      .min(1, 'Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    path: ['newPasswordConfirmation'],
    message: 'A confirmação da nova senha não coincide',
  })

type ProfileForm = z.infer<typeof profileFormSchema>

export default function ProfileScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({ resolver: zodResolver(profileFormSchema) })

  const { userPhoto, handleUserPhotoSelect } = useUserPhoto()

  function handleLogOut() {}

  function handleUpdateProfile({
    fullName,
    phone,
    email,
    password,
    newPassword,
    newPasswordConfirmation,
  }: ProfileForm) {
    console.log({
      fullName,
      phone,
      email,
      password,
      newPassword,
      newPasswordConfirmation,
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View flex={1} bg={'$background'}>
        <View position="relative">
          <Center mt="$16" mb="$8">
            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <UserPhoto
                width={120}
                height={120}
                source={userPhoto && { uri: userPhoto }}
                alt="Imagem do usuário"
              />
            </TouchableOpacity>
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
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Nome"
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
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="E-mail"
                  icon={Mail}
                  placeholder="mail@exemplo.br"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Senha atual"
                  id="currentPassword"
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
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Nova senha"
                  type="password"
                  icon={KeyRound}
                  placeholder="Sua nova senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.newPassword?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="newPasswordConfirmation"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="underlined"
                  label="Confirmar nova senha"
                  id="newPasswordConfirmation"
                  type="password"
                  icon={KeyRound}
                  placeholder="Confirme sua nova senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.newPasswordConfirmation?.message}
                  onSubmitEditing={handleSubmit(handleUpdateProfile)}
                  returnKeyType="send"
                />
              )}
            />
          </View>

          <Button
            title="Atualizar cadastro"
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </View>
      </View>
    </ScrollView>
  )
}
