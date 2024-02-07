import { WorkspaceDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

interface UpdateWorkspaceRequest {
  name: string
  code: string
}

interface UpdateWorkspaceResponse {
  workspace: WorkspaceDTO
}

export async function updateWorkspace({ name, code }: UpdateWorkspaceRequest) {
  const response = await api.put<UpdateWorkspaceResponse>('/workspaces', {
    name,
    code,
  })

  return response
}
