import { useEffect, useState } from 'react'
import { redirect, RouterProvider } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

import { appRouter } from './app-router'
import { authRouter } from './auth-router'
import { noWorkspaceRouter } from './no-workspace-router'

export function Routes() {
  const { refreshToken, accessToken } = useAuth()
  const [route, setRoute] = useState<typeof appRouter | null>(null)

  useEffect(() => {
    async function getRoute() {
      try {
        const { user: newUser } = await refreshToken()

        if (newUser.workspaceId) {
          setRoute(appRouter)
        } else if (newUser.id) {
          setRoute(noWorkspaceRouter)
        } else {
          setRoute(authRouter)
        }
      } catch (error) {
        setRoute(authRouter)
      }
    }

    if (!accessToken) {
      getRoute()
    }

    redirect('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return route && <RouterProvider router={route} />
}
