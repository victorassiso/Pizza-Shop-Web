import { api } from '@/lib/axios'

export interface RefreshTokenResponse {
  user: {
    id: string
    workspaceId: string
  }
  accessToken: string
}

export async function refreshToken() {
  const response = await api.patch<RefreshTokenResponse>('/token/refresh')

  return response
}
