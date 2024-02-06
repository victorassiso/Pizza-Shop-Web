import { User } from '@/@types/user'
import { api } from '@/lib/axios'

interface RemoveWorkspaceResponseData {
  user: User
}
export async function removeWorkspace() {
  const response = await api.patch<RemoveWorkspaceResponseData>(
    '/users/remove-workspace',
  )

  return response
}
