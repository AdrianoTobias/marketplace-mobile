import { useState } from 'react'
import { useToast } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { ToastMessage } from '@components/ToastMessage'

export function useUserPhoto() {
  const [userPhoto, setUserPhoto] = useState('')
  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      const photoUri = photoSelected.assets[0].uri

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="info"
                title="Essa imagem é muito grande. Escolha uma de até 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserPhoto(photoUri)
      }
    } catch (error) {
      return toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={`Erro ao tentar obter a imagem: ${error}`}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  return { userPhoto, handleUserPhotoSelect }
}
