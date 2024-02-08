import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Order } from '@/@types/bd-entities'
import { createOrder } from '@/api/orders/create-order'
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
import { useOrdersSearchParams } from '@/hooks/params/use-orders-search-params'
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

  const {
    formattedSearchParams: { customerName: customerNameParam, status },
  } = useOrdersSearchParams()

  const queryClient = useQueryClient()

  function updateOrdersCache(order: Order, customerName: string) {
    const doesNewOrderCustomerNameMatchesCurrentFilter = customerNameParam
      ? customerName.includes(customerNameParam)
      : true

    const doesNewOrderStatusMatchesCurrentFilter = !!(
      !status ||
      status === 'all' ||
      status === order.status
    )

    const filteredQueryKey = [
      'orders',
      undefined, // pageIndex
      undefined, // orderId
      doesNewOrderCustomerNameMatchesCurrentFilter
        ? customerNameParam
        : undefined,
      doesNewOrderStatusMatchesCurrentFilter ? status : undefined,
    ]

    const emptyFilterQueryKey = [
      'orders',
      undefined, // pageIndex
      undefined, // orderId
      undefined, // customerName
      undefined, // status
    ]

    const newOrder = {
      id: order.id,
      createdAt: order.createdAt,
      status: order.status,
      customerName,
      total: order.total,
    }

    // Update Filtered Cache
    if (
      doesNewOrderCustomerNameMatchesCurrentFilter ||
      doesNewOrderStatusMatchesCurrentFilter
    ) {
      const cached =
        queryClient.getQueryData<GetOrdersResponse>(filteredQueryKey)

      if (!cached) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(filteredQueryKey, {
        ...cached,
        orders: [newOrder, ...cached.orders],
      })
    }

    // Update Empty Filter Cache
    const cached =
      queryClient.getQueryData<GetOrdersResponse>(emptyFilterQueryKey)

    if (!cached) {
      return
    }

    queryClient.setQueryData<GetOrdersResponse>(emptyFilterQueryKey, {
      ...cached,
      orders: [newOrder, ...cached.orders],
    })
  }

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
    retry: 3,
  })

  async function handleCreateOrder(data: CreateOrderType) {
    try {
      const newOrder = await createOrderFn({
        customerId: data.customerId,
        items: data.items.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
          }
        }),
      })
      updateOrdersCache(newOrder, data.customerName)
      handleOpenDialog(false)
      toast.success('Pedido cadastrado com sucesso', {
        closeButton: true,
      })
    } catch {
      toast.error('Erro ao cadastrar pedido', {
        closeButton: true,
      })
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
