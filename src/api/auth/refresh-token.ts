import { api } from '@/lib/axios'

interface refreshTokenResponseData {
  accessToken: string
}

export async function refreshToken() {
  const response = await api.patch<refreshTokenResponseData>('/token/refresh')

  return response
}
