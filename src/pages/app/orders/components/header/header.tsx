import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { CreateOrderDialog } from './components/create-order-dialog/create-order-dialog'
import { Filter } from './components/filter/filter'

export function Header() {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    formMethods: { reset },
  } = useCreateOrderFormContext()

  function handleOpenDialog(open: boolean) {
    if (!open) {
      reset()
    }
    setOpenDialog(open)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button>Novo pedido</Button>
          </DialogTrigger>
          <CreateOrderDialog handleOpenDialog={handleOpenDialog} />
        </Dialog>
      </div>
      <Filter />
    </div>
  )
}
