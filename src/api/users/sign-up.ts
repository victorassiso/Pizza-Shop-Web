import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpBody) {
  await api.post('/users', {
    name,
    email,
    password,
  })
}
