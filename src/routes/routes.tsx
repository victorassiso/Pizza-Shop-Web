import { RouterProvider } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

import { appRouter } from './app-router'
import { authRouter } from './auth-router'
import { noWorkspaceRouter } from './no-workspace-router'

export function Routes() {
  const { user } = useAuth()

  return (
    <RouterProvider
      router={
        user.id
          ? user.workspaceId
            ? appRouter
            : noWorkspaceRouter
          : authRouter
      }
    />
  )
}
