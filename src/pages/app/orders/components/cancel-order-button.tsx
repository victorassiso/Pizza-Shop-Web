import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { cancelOrder } from '@/api/orders/cancel-order'
import { Button } from '@/components/ui/button'

import { OrderStatusType } from './order-status'

interface CancelOrderButtonProps {
  orderId: string
  status: OrderStatusType
  updateOrderStatusOnCache: (orderId: string, status: OrderStatusType) => void
}

export function CancelOrderButton({
  orderId,
  status,
  updateOrderStatusOnCache,
}: CancelOrderButtonProps) {
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
