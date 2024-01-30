import { Pizza } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'
import { api, isApiError } from '@/lib/axios'

export function AuthLayout() {
  const { refreshToken, accessToken } = useAuth()

  useEffect(() => {
    const interceptorId = api.interceptors.request.use((request) => {
      request.headers.Authorization = `Bearer ${accessToken}`
      console.log('request')
      return request
    })

    return () => {
      api.interceptors.request.eject(interceptorId)
    }
  }, [accessToken])

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error)
        if (isApiError(error) && error.response?.status === 401) {
          refreshToken()
        }
        return error
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [refreshToken, accessToken])
  return (
    <div className="min-h-screen md:grid md:grid-cols-2 ">
      <div className="text-muted-foreground md:flex md:h-full md:flex-col md:justify-between md:border-r md:border-foreground/5 md:bg-muted md:p-10">
        <div className="absolute left-8 top-8 flex items-center gap-3 text-lg text-foreground md:relative md:left-auto md:top-auto">
          {/* <div className="flex items-center gap-3 text-lg text-foreground"> */}
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>

        <footer className="absolute bottom-8 left-0 right-0 text-center text-sm md:relative md:bottom-auto md:left-auto md:right-auto md:text-start">
          {/* <footer className="text-sm"> */}
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex h-screen flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
