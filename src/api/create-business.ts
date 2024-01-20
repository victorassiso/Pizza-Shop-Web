import { api } from '@/lib/axios'

export interface CreateBusinessBody {
  name: string
  code: string
}

export async function createBusiness({ name, code }: CreateBusinessBody) {
  await api.post('/businesses', {
    name,
    code,
  })
}
