import { createContext, ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { env } from '@/env'

export const CreateWorkspaceFormSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
})

export type CreateWorkspaceFormType = z.infer<typeof CreateWorkspaceFormSchema>

interface CreateWorkspaceWithMockDataContextProps {
  start: (data: CreateWorkspaceFormType) => void
  lastMessage: string
  isLoading: boolean
}

export const CreateWorkspaceWithMockDataContext = createContext(
  {} as CreateWorkspaceWithMockDataContextProps,
)

interface ContextProviderProps {
  children: ReactNode
}

export function CreateWorkspaceWithMockDataContextProvider({
  children,
}: ContextProviderProps) {
  const [lastMessage, setLastMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function start(data: CreateWorkspaceFormType) {
    const socket = new WebSocket(
      env.VITE_API_URL.replace('http', 'ws').concat('/seedDatabase'),
    )

    socket.addEventListener('open', () => {
      console.log('opened')
      socket.send(JSON.stringify(data))
    })

    socket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data)
      if (!data.step && data.status === 409) {
        toast.error('Esse código já está em uso, tente um diferente.', {
          closeButton: true,
        })
      } else if (!isLoading && data.step) {
        setIsLoading(true)
      } else if (data.status === 201) {
        window.location.replace('/')
      } else if (!data.step && data.status !== 409 && data.status !== 201) {
        console.log({ data })
        toast.error('Falha ao atualizar loja, tente novamente.', {
          closeButton: true,
        })
      }

      setLastMessage(e.data)
    })

    socket.addEventListener('close', () => {
      setIsLoading(false)
      console.log('closed')
    })
  }

  return (
    <CreateWorkspaceWithMockDataContext.Provider
      value={{
        start,
        lastMessage,
        isLoading,
      }}
    >
      {children}
    </CreateWorkspaceWithMockDataContext.Provider>
  )
}
