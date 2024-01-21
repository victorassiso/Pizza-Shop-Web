import { api } from '@/lib/axios'

interface UpdateWorkspaceBody {
  name: string
  code: string
}

export async function updateWorkspace({ name, code }: UpdateWorkspaceBody) {
  await api.put('/workspaces', {
    name,
    code,
  })
}
