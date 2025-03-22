import { TouchableOpacity } from 'react-native'
import { View, Text, Icon, Image, ScrollView } from '@gluestack-ui/themed'
import { Button } from '@components/Button'
import { ChartColumn, MoveLeft } from 'lucide-react-native'

export default function ProductDetails() {
  function handleGoBack() {}
  function handlePhoneContact() {}

  return (
    <View flex={1}>
      <View flex={1} gap={'$4'} px={'$6'} mt="$16">
        <TouchableOpacity onPress={handleGoBack}>
          <View flexDirection="row" gap={'$2'} p={2} alignItems="flex-end">
            <Icon as={MoveLeft} color="$orangeBase" size={'lg'} />

            <Text
              color="$orangeBase"
              fontFamily="$action"
              fontSize={'$action_sm'}
              lineHeight={16}
            >
              Voltar
            </Text>
          </View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            w="$full"
            h={197}
            mb={'$8'}
            rounded={6}
            source={'https://github.com/adrianotobias.png'}
          />

          <View flex={1} gap={'$7'}>
            <View gap={'$4'}>
              <View flexDirection="row" justifyContent="space-between">
                <Text
                  color="$gray400"
                  fontFamily="$heading"
                  fontSize={'$title_md'}
                >
                  Sofá
                </Text>

                <View flexDirection="row" gap={'$1'} alignItems="flex-end">
                  <Text
                    color="$gray500"
                    fontFamily="$label"
                    fontSize={'$label_md'}
                  >
                    R$
                  </Text>

                  <Text
                    color="$gray500"
                    fontFamily="$heading"
                    fontSize={'$title_md'}
                    lineHeight={'$title_md'}
                  >
                    1.200,90
                  </Text>
                </View>
              </View>

              <Text color="$gray400" fontFamily="$body" fontSize={'$body_sm'}>
                Sofá revestido em couro legítimo, com estrutura em madeira
                maciça e pés em metal cromado.
                {'\n'}
                {'\n'}
                Largura: 1,80m
                {'\n'}
                Altura do chão: 20cm
              </Text>
            </View>

            <View gap={6}>
              <Text
                color="$gray500"
                fontFamily="$heading"
                fontSize={'$title_xs'}
              >
                Categoria
              </Text>

              <Text color="$gray400" fontFamily="$body" fontSize={'$body_xs'}>
                Móvel
              </Text>
            </View>

            <View
              flexDirection="row"
              h={60}
              gap={'$3'}
              pl={'$3'}
              pr={'$4'}
              py={'$3'}
              rounded={10}
              alignItems="center"
              bg={'$blueLigth'}
            >
              <View bg={'$blueDark'} p={'$2'} rounded={6}>
                <Icon as={ChartColumn} color="$white" size={'lg'} />
              </View>

              <Text
                flex={1}
                color="$gray400"
                fontFamily="$body"
                fontSize={'$body_xs'}
                lineHeight={16.8}
              >
                <Text
                  fontWeight="bold"
                  color="$gray400"
                  fontFamily="$body"
                  fontSize={'$body_sm'}
                  lineHeight={16.8}
                >
                  24 pessoas
                </Text>{' '}
                visualizaram este produto nos últimos 7 dias
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        flexDirection="row"
        h={96}
        p={'$6'}
        pb={'$8'}
        bg={'$white'}
        alignItems="center"
        justifyContent="space-between"
        style={{
          elevation: 10,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
        }}
      >
        <View flexDirection="row" gap={'$1'} alignItems="flex-end">
          <Text color="$gray500" fontFamily="$label" fontSize={'$label_md'}>
            R$
          </Text>

          <Text
            color="$gray500"
            fontFamily="$heading"
            fontSize={'$title_lg'}
            lineHeight={'$title_lg'}
          >
            1.200,90
          </Text>
        </View>

        <Button
          title="Entrar em contato"
          width={170}
          height={40}
          fontSize={14}
          onPress={handlePhoneContact}
        />
      </View>
    </View>
  )
}
