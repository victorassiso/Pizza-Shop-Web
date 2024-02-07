import { UserDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'
interface getUserResponse {
  user: UserDTO
}

export async function getUser() {
  const response = await api.get<getUserResponse>('/me')

  const user = response.data.user

  return user
}
