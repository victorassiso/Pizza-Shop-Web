import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { OrderStatusType } from '@/@types/order'
import { cancelOrder } from '@/api/orders/cancel-order'
import { Button } from '@/components/ui/button'
import { useOrders } from '@/hooks/use-orders'

interface CancelOrderButtonProps {
  orderId: string
  status: OrderStatusType
}

export function CancelOrderButton({ orderId, status }: CancelOrderButtonProps) {
  const { updateOrderStatusOnCache } = useOrders()

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
        toast.success('Pedido cancelado com sucesso!')
      },
    })

  return (
    <div>
      <Button
        disabled={
          !['pending', 'processing', 'delivering'].includes(status) ||
          isCancelingOrder
        }
        variant="ghost"
        size="xs"
        type="button"
        onClick={() => cancelOrderFn({ orderId })}
      >
        <X className="mr-2 h-3 w-3" />
        Cancelar
      </Button>
    </div>
  )
}
