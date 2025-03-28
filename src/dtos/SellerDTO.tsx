import { AttachmentDTO } from '@dtos/AttachmentDTO'

export type SellerDTO = {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: AttachmentDTO
  }
}
