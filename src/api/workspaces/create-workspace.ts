import { api } from '@/lib/axios'

export interface CreateWorkspaceBody {
  name: string
  code: string
}

export async function createWorkspace({ name, code }: CreateWorkspaceBody) {
  await api.post('/workspaces', {
    name,
    code,
  })
}
