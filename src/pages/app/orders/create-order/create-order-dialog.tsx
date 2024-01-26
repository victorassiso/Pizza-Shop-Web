import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'sonner'

import { createOrder, Order } from '@/api/orders/create-order'
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
import { createOrderContext } from '@/contexts/create-order-context'

import { CustomerCombobox } from './customers-combobox'
import { ItemList } from './item-list'
import { ProductsCombobox } from './products-combobox'

interface CreateOrderDialogProps {
  handleOpenDialog: (open: boolean) => void
}

export function CreateOrderDialog({
  handleOpenDialog,
}: CreateOrderDialogProps) {
  const {
    submitPreSelectedProduct,
    preSelectProduct,
    items,
    customer,
    clearItems,
  } = useContext(createOrderContext)
  const queryClient = useQueryClient()

  function updateOrdersCache(order: Order) {
    const cached = queryClient.getQueryData<Order[]>(['orders'])

    if (!cached) {
      return
    }

    queryClient.setQueryData<Order[]>(['orders'], [order, ...cached])
  }

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  })

  async function handleCreateOrder() {
    try {
      const newOrder = await createOrderFn({
        customerId: customer ? customer.id : '',
        items: items.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
          }
        }),
      })
      updateOrdersCache(newOrder)
      handleOpenDialog(false)
      toast.success('Pedido cadastrado com sucesso')
    } catch {
      toast.error('Erro ao cadastrar pedido')
    }
  }

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>Novo Pedido</DialogTitle>
        <DialogDescription>Crie um novo pedido</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleCreateOrder}>
        <div className="space-y-10 py-4">
          <div className="ml-4 flex items-center gap-4">
            <Label className="text-right" htmlFor="customerName">
              Cliente
            </Label>
            <CustomerCombobox />
          </div>
          <div className="ml-4 flex items-center gap-4">
            <Label className="text-right" htmlFor="customerName">
              Produto
            </Label>
            <ProductsCombobox />
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                submitPreSelectedProduct()
                preSelectProduct(null)
              }}
            >
              Adicionar item
            </Button>
          </div>
          <ItemList />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" onClick={clearItems}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="success" onClick={handleCreateOrder}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
