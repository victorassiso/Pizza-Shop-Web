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

  console.log()

  return (
    !['delivered', 'canceled'].includes(status) && (
      <Button
        disabled={isCancelingOrder}
        variant="ghost"
        type="button"
        className="flex w-full flex-row justify-start gap-2 text-destructive"
        onClick={() => cancelOrderFn({ orderId })}
      >
        <X />
        Cancelar
      </Button>
    )
  )
}
