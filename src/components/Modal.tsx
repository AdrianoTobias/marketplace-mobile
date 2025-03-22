import { ComponentProps } from 'react'
import {
  Text,
  Heading,
  Icon,
  Modal as GluestackModal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  View,
  Center,
} from '@gluestack-ui/themed'
import { Input } from '@components/Input'
import { Checkbox } from '@components/Checkbox'
import { Button } from '@components/Button'
import { X } from 'lucide-react-native'

type Props = ComponentProps<typeof GluestackModal>

export function Modal({ onClose, ...props }: Props) {
  return (
    <GluestackModal {...props}>
      <ModalBackdrop />
      <ModalContent
        width={'$full'}
        height={583}
        mt="auto"
        px={10}
        borderTopLeftRadius={28}
        borderTopRightRadius={28}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        bg={'$white'}
      >
        <ModalHeader>
          <View flex={1}>
            <Center mb={24}>
              <View bg={'$gray100'} w={56} h={4} opacity={0.3} />
            </Center>

            <View flexDirection="row" justifyContent="space-between">
              <Heading color="$gray500" fontFamily="$heading">
                Filtrar anúncios
              </Heading>

              <ModalCloseButton onPress={onClose}>
                <Icon as={X} color="$gray300" size={'lg'} />
              </ModalCloseButton>
            </View>
          </View>
        </ModalHeader>
        <ModalBody mt={'$2'}>
          <View gap={'$2'}>
            <Text color="$gray400" fontFamily="$heading" fontSize={'$title_xs'}>
              Valor
            </Text>

            <View flexDirection="row" justifyContent="space-between">
              <View w={'48%'}>
                <Input
                  id="valueFrom"
                  placeholder="De"
                  keyboardType="phone-pad"
                />
              </View>

              <View w={'48%'}>
                <Input
                  id="valueTo"
                  placeholder="Até"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          <View gap={'$5'} mt={'$6'}>
            <Text color="$gray400" fontFamily="$heading" fontSize={'$title_xs'}>
              Categoria
            </Text>

            <Checkbox label={'Brinquedo'} value={'Brinquedo'} />
            <Checkbox label={'Móvel'} value={'Brinquedo'} />
            <Checkbox label={'Papelaria'} value={'Brinquedo'} />
            <Checkbox label={'Saúde & Beleza'} value={'Brinquedo'} />
            <Checkbox label={'Utensílio'} value={'Brinquedo'} />
            <Checkbox label={'Vestuário'} value={'Brinquedo'} />
          </View>
        </ModalBody>
        <ModalFooter justifyContent="space-between" mb={'$2'}>
          <Button
            width={'48%'}
            height={40}
            fontSize={14}
            title="Limpar filtro"
            variant="outline"
          />

          <Button width={'48%'} height={40} fontSize={14} title="Filtrar" />
        </ModalFooter>
      </ModalContent>
    </GluestackModal>
  )
}
