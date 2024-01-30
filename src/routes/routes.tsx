import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

import { appRouter } from './app-router'
import { authRouter } from './auth-router'
import { noWorkspaceRouter } from './no-workspace-router'

export function Routes() {
  const { refreshToken } = useAuth()
  const [route, setRoute] = useState<typeof appRouter | null>(null)

  useEffect(() => {
    async function getRoute() {
      const { user } = await refreshToken()
      if (user.workspaceId) {
        setRoute(appRouter)
      } else if (user.id) {
        setRoute(noWorkspaceRouter)
      } else {
        setRoute(authRouter)
      }
    }

    getRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return route && <RouterProvider router={route} />
}
