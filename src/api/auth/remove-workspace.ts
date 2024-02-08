import { UserDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

interface RemoveWorkspaceResponseData {
  user: UserDTO
}
export async function removeWorkspace() {
  const response =
    await api.patch<RemoveWorkspaceResponseData>('/workspaces/remove')

  const user = response.data.user

  return user
}
