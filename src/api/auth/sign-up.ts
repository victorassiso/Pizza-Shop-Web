import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  email: string
  password: string
}

export interface SignUpResponseData {
  user: {
    id: string
    workspaceId: string
  }
  accessToken: string
}

export async function signUp({ name, email, password }: SignUpBody) {
  const response = await api.post<SignUpResponseData>('/users', {
    name,
    email,
    password,
  })

  return response
}
