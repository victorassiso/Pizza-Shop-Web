import { api } from '@/lib/axios'

interface getProfileResponse {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date | null
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')

  return response.data
}
