import { api } from '@/lib/axios'

interface Profile {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date | null
}
interface getProfileResponse {
  profile: Profile
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')

  const profile: Profile = response.data.profile

  return profile
}
