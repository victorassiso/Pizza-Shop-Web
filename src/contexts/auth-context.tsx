import { useMutation } from '@tanstack/react-query'
import { createContext, ReactNode, useState } from 'react'

import {
  refreshToken as refreshTokenApi,
  RefreshTokenResponseData,
} from '@/api/auth/refresh-token'
import { signIn as signInApi, SignInBody } from '@/api/auth/sign-in'
import { signOut as signOutApi } from '@/api/auth/sign-out'
import { signUp as signUpApi, SignUpBody } from '@/api/auth/sign-up'
import {
  createWorkspace as createWorkspaceApi,
  CreateWorkspaceBody,
} from '@/api/workspaces/create-workspace'
import {
  joinInWorkspace as joinInWorkspaceApi,
  JoinInWorkspaceBody,
} from '@/api/workspaces/join-in-workspace'
import { queryClient } from '@/lib/react-query'

interface UserDTO {
  id: string
  workspaceId: string
}
interface AuthContextProps {
  user: UserDTO
  accessToken: string
  signIn: (data: SignInBody) => Promise<UserDTO>
  signUp: (data: SignUpBody) => Promise<UserDTO>
  signOut: () => Promise<void>
  joinInWorkspace: (data: JoinInWorkspaceBody) => Promise<UserDTO>
  createWorkspace: (data: CreateWorkspaceBody) => Promise<UserDTO>
  refreshToken: () => Promise<RefreshTokenResponseData>
  isSigningOut: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as UserDTO)
  const [accessToken, setAccessToken] = useState('')
  const { mutateAsync: signInApiFn } = useMutation({
    mutationFn: signInApi,
  })

  async function signIn({ email, password }: SignInBody) {
    const { data } = await signInApiFn({ email, password })

    setUser({
      id: data.user.id,
      workspaceId: data.user.workspaceId,
    })
    setAccessToken(data.accessToken)

    return user
  }

  const { mutateAsync: signUpApiFn } = useMutation({
    mutationFn: signUpApi,
  })

  async function signUp({ name, email, password }: SignUpBody) {
    const { data } = await signUpApiFn({ name, email, password })

    setUser({
      id: data.user.id,
      workspaceId: data.user.workspaceId,
    })
    setAccessToken(data.accessToken)

    return user
  }

  const { mutateAsync: signOutApiFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOutApi,
  })

  async function signOut() {
    await signOutApiFn()
    setUser({} as UserDTO)
    setAccessToken('')
    queryClient.clear()
  }

  const { mutateAsync: joinInWorkspaceApiFn } = useMutation({
    mutationFn: joinInWorkspaceApi,
  })

  const { mutateAsync: refreshTokenApiFn } = useMutation({
    mutationFn: refreshTokenApi,
  })

  async function joinInWorkspace({ code }: JoinInWorkspaceBody) {
    const { data: joinInWorkspaceData } = await joinInWorkspaceApiFn({ code })

    const { data: refreshData } = await refreshTokenApiFn()
    setUser({
      ...user,
      workspaceId: joinInWorkspaceData.workspaceId,
    })
    setAccessToken(refreshData.accessToken)

    return user
  }

  const { mutateAsync: createWorkspaceApiFn } = useMutation({
    mutationFn: createWorkspaceApi,
  })

  async function createWorkspace({ name, code }: CreateWorkspaceBody) {
    const { data: createWorkspaceData } = await createWorkspaceApiFn({
      name,
      code,
    })

    const { data: refreshData } = await refreshTokenApiFn()

    setUser({
      ...user,
      workspaceId: createWorkspaceData.workspaceId,
    })
    setAccessToken(refreshData.accessToken)

    return user
  }

  async function refreshToken() {
    try {
      const { data } = await refreshTokenApiFn()
      setAccessToken(data.accessToken)
      setUser({
        id: 'test',
        workspaceId: data.user.workspaceId,
      })

      return {
        user: {
          id: data.user.id,
          workspaceId: data.user.workspaceId,
        },
        accessToken: data.accessToken,
      }
    } catch (error) {
      if (user.id) {
        setUser({} as UserDTO)
      }
      if (accessToken) {
        setAccessToken('')
      }
      queryClient.clear()

      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        signIn,
        signUp,
        signOut,
        joinInWorkspace,
        isSigningOut,
        createWorkspace,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
