import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { useAuth } from '@/hooks/use-auth'
import { api, isApiError } from '@/lib/axios'

export function AppLayout() {
  const { refreshToken, accessToken } = useAuth()
  const navigate = useNavigate()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((request) => {
      request.headers.Authorization = `Bearer ${accessToken}`
      return request
    })

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isApiError(error)) {
          const status = error.response?.status
          const message = error.response?.data.message

          if (status === 401 && message === 'Unauthorized') {
            if (!isRefreshing) {
              // Set flag to indicate that a refresh is in progress
              setIsRefreshing(true)
              try {
                // Attempt to refresh the token
                const { accessToken: newAccessToken } = await refreshToken()
                // Retry the original request if error.config is defined
                if (error.config) {
                  error.request.Authorization = `Bearer ${newAccessToken}`
                  // return api(error.config)
                }
              } catch (refreshError) {
                console.error('Token refresh failed:', refreshError)

                navigate('/', { replace: true })
              } finally {
                // Reset the flag after refresh attempt, regardless of success or failure
                setIsRefreshing(false)
              }
            }
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [navigate, refreshToken, isRefreshing, accessToken])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
