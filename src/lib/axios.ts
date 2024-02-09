import axios from 'axios'

import { env } from '@/env'

export const isApiError = axios.isAxiosError

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    const delay = Math.floor(Math.random() * 2000 + 1000)
    console.log({ delay })
    await new Promise((resolve) => setTimeout(resolve, delay))

    return config
  })
}
