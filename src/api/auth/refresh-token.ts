import { api } from '@/lib/axios'

export interface RefreshTokenResponseData {
  user: {
    id: string
    workspaceId: string
  }
  accessToken: string
}

export async function refreshToken() {
  const response = await api.patch<RefreshTokenResponseData>('/token/refresh')

  return response
}
