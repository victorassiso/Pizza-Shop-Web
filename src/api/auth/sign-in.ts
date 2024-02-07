import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  user: {
    id: string
    workspaceId: string
  }
  accessToken: string
}

export async function signIn({ email, password }: SignInRequest) {
  const response = await api.post<SignInResponse>('/sessions', {
    email,
    password,
  })

  return response
}
