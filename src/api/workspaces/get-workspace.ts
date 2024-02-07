import { WorkspaceDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface GetWorkspaceResponse {
  workspace: WorkspaceDTO
}

export async function getWorkspace() {
  const response = await api.get<GetWorkspaceResponse>('/workspaces')

  const workspace = response.data.workspace

  return workspace
}
