import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { useAuth } from '@/hooks/use-auth'
import { api, isApiError } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()
  const { refreshToken, accessToken } = useAuth()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isApiError(error)) {
          const status = error.response?.status
          const message = error.response?.data.message

          if (status === 401 && message === 'Unauthorized') {
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  useEffect(() => {
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest._retry = true

          await refreshToken()

          prevRequest.headers.Authorization = `Bearer ${accessToken}`

          return api(prevRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(responseIntercept)
    }
  }, [accessToken, refreshToken])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
