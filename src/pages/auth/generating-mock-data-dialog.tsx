import { useCallback, useContext, useMemo, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { z } from 'zod'

import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Progress } from '@/components/ui/progress'
import { CreateWorkspaceWithMockDataContext } from '@/contexts/create-workspace-with-mock-data-context'

const ProgressMessageSchema = z.object({
  step: z.string(),
  progress: z.coerce.number(),
})

type ProgressMessage = z.infer<typeof ProgressMessageSchema>

export function GeneratingMockDataDialog() {
  const { lastMessage } = useContext(CreateWorkspaceWithMockDataContext)
  const [progress, setProgress] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    items: 0,
  })

  const handleUpdateProgress = useCallback((data: ProgressMessage) => {
    switch (data.step) {
      case 'products':
        setProgress((prev) => ({
          ...prev,
          products: data.progress * 100,
        }))
        break
      case 'customers':
        setProgress((prev) => ({
          ...prev,
          customers: data.progress * 100,
        }))
        break
      case 'orders':
        setProgress((prev) => ({
          ...prev,
          orders: data.progress * 100,
        }))
        break
      case 'items':
        setProgress((prev) => ({
          ...prev,
          items: data.progress * 100,
        }))
        break
      default:
        console.error('DEBUG DEFAUlT SWITCH ERROR: ', data)
        break
    }
  }, [])

  const data = useMemo(() => {
    return lastMessage ? JSON.parse(lastMessage) : undefined
  }, [lastMessage])

  useMemo(() => {
    const progressMessageParse = ProgressMessageSchema.safeParse(data)
    if (progressMessageParse.success) {
      handleUpdateProgress(progressMessageParse.data)
    }
  }, [data, handleUpdateProgress, lastMessage])

  return (
    <AlertDialogContent className="flex max-w-[calc(100%-1rem)] flex-col items-center gap-2 sm:max-w-lg">
      <AlertDialogHeader>
        <AlertDialogTitle>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <ClipLoader size={15} color="hsl(var(--primary))" />
            Gerando dados fictícios...
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Na versão demo, as lojas são criadas com dados fictícios para
          facilitar a demonstração.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="mt-4 flex w-full flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <span className="flex w-24 justify-end">Produtos:</span>
          <Progress value={progress.products} className="w-full" />
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="flex w-24 justify-end">Clientes:</span>
          <Progress value={progress.customers} className="w-full" />
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="flex w-24 justify-end">Pedidos:</span>
          <Progress value={progress.orders} className="w-full" />
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="flex w-24 justify-end">Itens:</span>
          <Progress value={progress.items} className="w-full" />
        </div>
      </div>
    </AlertDialogContent>
  )
}
