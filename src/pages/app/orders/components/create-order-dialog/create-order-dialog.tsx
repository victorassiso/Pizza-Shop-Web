import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createOrder } from '@/api/orders/create-order'
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
import { useOrdersCache } from '@/hooks/cache/use-orders-cache'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { CustomersCombobox } from './components/customers-combobox/customers-combobox'
import { Items } from './components/order-items/order-items'

export function CreateOrderDialog() {
  const { handleUpdateOrdersCache } = useOrdersCache()

  const {
    formMethods: {
      handleSubmit,
      reset,
      formState: { isSubmitting },
    },
    handleOpenDialog,
  } = useCreateOrderFormContext()

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
      handleUpdateOrdersCache(newOrder, data.customerName)
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
