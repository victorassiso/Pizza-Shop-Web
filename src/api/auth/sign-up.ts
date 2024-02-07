import { api } from '@/lib/axios'

export interface SignUpRequest {
  name: string
  email: string
  password: string
}

export interface SignUpResponse {
  user: {
    id: string
    workspaceId: string
  }
  accessToken: string
}

export async function signUp({ name, email, password }: SignUpRequest) {
  const response = await api.post<SignUpResponse>('/users', {
    name,
    email,
    password,
  })

  return response
}
