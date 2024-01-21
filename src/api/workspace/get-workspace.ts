import { api } from '@/lib/axios'

export interface getWorkspaceResponse {
  id: string
  name: string
  code: string
  createdAt: string
}

export async function getWorkspace() {
  const response = await api.get<getWorkspaceResponse>('/workspaces')

  return response.data
}
