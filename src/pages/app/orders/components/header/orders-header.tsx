import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { CreateOrderDialog } from './create-order-dialog/create-order-dialog'
import { OrderFilters } from './order-filters'

export const createOrderSchema = z.object({
  customerId: z
    .string({
      errorMap: () => ({ message: 'O cliente é obrigatório' }),
    })
    .min(1),
  customerName: z.string().min(1),
  items: z
    .array(
      z.object({
        product: z.object({
          name: z.string().min(1),
          id: z.string(),
          price: z.coerce.number(),
        }),
        quantity: z.coerce.number(),
        subtotal: z.coerce.number(),
      }),
    )
    .min(1),
  total: z.coerce.number(),
})

export type CreateOrderSchema = z.infer<typeof createOrderSchema>

export function OrdersHeader() {
  const [openDialog, setOpenDialog] = useState(false)

  const createOrderForm = useForm<CreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerId: '',
      customerName: '',
      items: [],
      total: 0,
    },
  })

  const { reset } = createOrderForm

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
          <FormProvider {...createOrderForm}>
            <CreateOrderDialog handleOpenDialog={handleOpenDialog} />
          </FormProvider>
        </Dialog>
      </div>
      <OrderFilters />
    </div>
  )
}
