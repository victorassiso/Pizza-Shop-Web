import { api } from '@/lib/axios'

interface Profile {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date | null
}
interface getProfileResponse {
  user: Profile
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')

  const user: Profile = response.data.user
  console.log(user)
  return user
}
