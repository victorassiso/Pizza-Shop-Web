import { useContext } from 'react'

import { AuthContext } from '@/contexts/auth-context'

export function useAuth() {
  const authContext = useContext(AuthContext)
  return authContext
}
