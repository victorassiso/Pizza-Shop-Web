import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createOrder, Order } from '@/api/orders/create-order'
import { GetOrdersResponse } from '@/api/orders/get-orders'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { CreateOrderType } from '@/contexts/create-order-form-context'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { CustomersCombobox } from './components/customers-combobox/customers-combobox'
import { Items } from './components/order-items/order-items'

export function CreateOrderDialog() {
  const {
    formMethods: {
      handleSubmit,
      reset,
      formState: { isSubmitting },
    },
    handleOpenDialog,
  } = useCreateOrderFormContext()
  const queryClient = useQueryClient()

  function updateOrdersCache(order: Order, customerName: string) {
    const cached = queryClient.getQueryData<GetOrdersResponse>([
      'orders',
      0, // pageIndex
      null, // orderId
      null, // customerName
      null, // status
    ])
    if (!cached) {
      return
    }

    queryClient.setQueryData<GetOrdersResponse>(
      [
        'orders',
        0, // pageIndex
        null, // orderId
        null, // customerName
        null, // status
      ],
      {
        ...cached,
        orders: [
          {
            orderId: order.id,
            createdAt: order.createdAt,
            status: order.status,
            customerName,
            total: order.total,
          },
          ...cached.orders,
        ],
      },
    )
  }

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  })

  async function handleCreateOrder(data: CreateOrderType) {
    try {
      const response = await createOrderFn({
        customerId: data.customerId,
        items: data.items.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
          }
        }),
      })

      updateOrdersCache(response, data.customerName)
      handleOpenDialog(false)
      toast.success('Pedido cadastrado com sucesso')
    } catch {
      toast.error('Erro ao cadastrar pedido')
    }
  }

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Novo Pedido</DialogTitle>
        <DialogDescription>Crie um novo pedido</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleCreateOrder)}>
        <div className="py-4">
          <div>
            <div className="ml-4 flex items-center gap-4">
              <Label className="text-right">Cliente</Label>
              <CustomersCombobox />
            </div>
          </div>
          <Items />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
