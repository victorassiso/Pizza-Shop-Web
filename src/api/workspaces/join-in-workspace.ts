import { api } from '@/lib/axios'

export interface JoinInWorkspaceRequest {
  code: string
}

export interface JoinInWorkspaceResponse {
  workspaceId: string
}

export async function joinInWorkspace({ code }: JoinInWorkspaceRequest) {
  const response = await api.post<JoinInWorkspaceResponse>('/workspace', {
    code,
  })

  return response
}
