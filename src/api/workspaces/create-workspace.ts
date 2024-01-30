import { api } from '@/lib/axios'

export interface CreateWorkspaceBody {
  name: string
  code: string
}

export interface CreateWorkspaceResponseData {
  workspaceId: string
}

export async function createWorkspace({ name, code }: CreateWorkspaceBody) {
  const response = await api.post<CreateWorkspaceResponseData>('/workspaces', {
    name,
    code,
  })

  return response
}
