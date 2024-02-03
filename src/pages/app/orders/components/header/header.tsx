import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { CreateOrderDialog } from './components/create-order-dialog/create-order-dialog'
import { Filter } from './components/filter/filter'

export function Header() {
  const {
    formMethods: {
      reset,
      formState: { isSubmitSuccessful },
    },
    openDialog,
    handleOpenDialog,
  } = useCreateOrderFormContext()

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful, reset])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button>Novo pedido</Button>
          </DialogTrigger>
          <CreateOrderDialog />
        </Dialog>
      </div>
      <Filter />
    </div>
  )
}
