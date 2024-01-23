import { api } from '@/lib/axios'

interface UpdateWorkspaceBody {
  code: string
}

export async function joinInWorkspace({ code }: UpdateWorkspaceBody) {
  await api.post('/workspace', {
    code,
  })
}
