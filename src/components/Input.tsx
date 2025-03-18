import {
  Input as GluestackInput,
  InputField,
  VStack,
  Icon,
  Text,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'
import { Eye, LucideIcon } from 'lucide-react-native'

type Props = ComponentProps<typeof InputField> & {
  label?: string
  icon?: LucideIcon
  type?: 'text' | 'password'
  id: string
}

export function Input({ label, icon, type = 'text', ...props }: Props) {
  return (
    <VStack width={'$full'}>
      {label && (
        <Text
          color="$gray300"
          fontFamily="$label"
          fontSize={'$label_md'}
          textTransform="uppercase"
        >
          {label}
        </Text>
      )}

      <GluestackInput
        gap={8}
        borderWidth={0}
        borderBottomWidth={1}
        borderColor="$gray100"
        $focus={{
          borderColor: '$gray400',
        }}
      >
        {icon && (
          <Icon as={icon} color="$gray200" size="lg" alignSelf="center" />
        )}

        <InputField
          px={2}
          fontFamily="$body"
          fontSize={'$body_md'}
          color="$gray400"
          placeholderTextColor={'$gray200'}
          selectionColor="#F24D0D"
          {...props}
        />

        {type === 'password' && (
          <Icon as={Eye} color="$gray300" size="lg" alignSelf="center" />
        )}
      </GluestackInput>
    </VStack>
  )
}
