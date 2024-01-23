import { api } from '@/lib/axios'

export interface Workspace {
  id: string
  name: string
  code: string
  createdAt: string
}
export interface GetWorkspaceResponse {
  workspace: Workspace
}

export async function getWorkspace() {
  const response = await api.get<GetWorkspaceResponse>('/workspaces')

  const workspace: Workspace = response.data.workspace

  return workspace
}
