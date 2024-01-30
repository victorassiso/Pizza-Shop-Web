import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponseData {
  user: {
    id: string
    workspaceId: string
  }
  accessToken: string
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponseData>('/sessions', {
    email,
    password,
  })

  return response
}
