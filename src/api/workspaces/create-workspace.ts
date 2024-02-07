import { api } from '@/lib/axios'

export interface CreateWorkspaceRequest {
  name: string
  code: string
}

interface CreateWorkspaceResponse {
  workspaceId: string
}

export async function createWorkspace({ name, code }: CreateWorkspaceRequest) {
  const response = await api.post<CreateWorkspaceResponse>('/workspaces', {
    name,
    code,
  })

  return response
}
