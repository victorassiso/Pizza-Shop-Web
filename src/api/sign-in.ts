import { api } from '@/lib/axios'

export async function SignIn() {
  await api.post('sessions')
}
