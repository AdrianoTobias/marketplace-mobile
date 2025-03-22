import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Image, Text, View } from '@gluestack-ui/themed'

type Props = TouchableOpacityProps

export function ProductCard({ ...props }: Props) {
  return (
    <View w={167} h={152} padding={'$1'} rounded={8} bg={'$white'}>
      <TouchableOpacity {...props}>
        <View gap={'$1'}>
          <Image
            w="$full"
            h={96}
            rounded={6}
            source={'https://github.com/adrianotobias.png'}
          />

          <View gap={2} padding={4}>
            <Text color="$gray400" fontFamily="$body" fontSize={'$body_xs'}>
              Sofá
            </Text>

            <View flexDirection="row" gap={'$1'} alignItems="flex-end">
              <Text
                color="$gray500"
                fontFamily="$label"
                fontSize={'$label_sm'}
                lineHeight={16}
              >
                R$
              </Text>

              <Text
                color="$gray500"
                fontFamily="$heading"
                fontSize={'$title_xs'}
                lineHeight={'$title_xs'}
              >
                1.200,90
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
