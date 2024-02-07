import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { OrderStatus } from '@/@types/bd-entities'
import { cancelOrder } from '@/api/orders/cancel-order'
import { Button } from '@/components/ui/button'
import { useOrders } from '@/hooks/use-orders'

// enum OrderStatus {
//   'pending' = 'pending',
//   'canceled' = 'canceled',
//   'processing' = 'processing',
//   'delivering' = 'delivering',
//   'delivered' = 'delivered',
// }

interface CancelOrderButtonProps {
  id: string
  status: OrderStatus
}

export function CancelOrderButton({ id, status }: CancelOrderButtonProps) {
  const { updateOrderStatusOnCache } = useOrders()

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { id }) {
        updateOrderStatusOnCache(id, 'canceled')
        toast.success('Pedido cancelado com sucesso!')
      },
    })

  console.log()

  return (
    !['delivered', 'canceled'].includes(status) && (
      <Button
        disabled={isCancelingOrder}
        variant="ghost"
        type="button"
        className="flex w-full flex-row justify-start gap-2 text-destructive"
        onClick={() => cancelOrderFn({ id })}
      >
        <X />
        Cancelar
      </Button>
    )
  )
}
