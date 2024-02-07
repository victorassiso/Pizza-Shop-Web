import { UserDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

interface RemoveWorkspaceResponseData {
  user: UserDTO
}
export async function removeWorkspace() {
  const response = await api.patch<RemoveWorkspaceResponseData>(
    '/users/remove-workspace',
  )

  const user = response.data.user

  return user
}
