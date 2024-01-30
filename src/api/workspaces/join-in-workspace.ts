import { api } from '@/lib/axios'

export interface JoinInWorkspaceBody {
  code: string
}

export interface JoinInWorkspaceResponseData {
  workspaceId: string
}

export async function joinInWorkspace({ code }: JoinInWorkspaceBody) {
  const response = await api.post<JoinInWorkspaceResponseData>('/workspace', {
    code,
  })

  return response
}
