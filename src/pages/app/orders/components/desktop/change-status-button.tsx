import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { OrderStatusType } from '@/@types/order'
import { approveOrder } from '@/api/orders/approve-order'
import { deliverOrder } from '@/api/orders/deliver-order'
import { dispatchOrder } from '@/api/orders/dispatch-order'
import { Button } from '@/components/ui/button'
import { useOrders } from '@/hooks/use-orders'

interface ChangeStatusButtonProps {
  orderId: string
  status: OrderStatusType
}
export function ChangeStatusButton({
  orderId,
  status,
}: ChangeStatusButtonProps) {
  const { updateOrderStatusOnCache } = useOrders()

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
        toast.success('Status do pedido atualizado com sucesso!')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
        toast.success('Status do pedido atualizado com sucesso!')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
        toast.success('Status do pedido atualizado com sucesso!')
      },
    })

  return (
    <div>
      {status === 'pending' && (
        <Button
          variant="outline"
          size="xs"
          disabled={isApprovingOrder}
          onClick={() => approveOrderFn({ orderId })}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      )}

      {status === 'processing' && (
        <Button
          variant="outline"
          size="xs"
          disabled={isDispatchingOrder}
          onClick={() => dispatchOrderFn({ orderId })}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Em entrega
        </Button>
      )}

      {status === 'delivering' && (
        <Button
          variant="outline"
          size="xs"
          disabled={isDeliveringOrder}
          onClick={() => deliverOrderFn({ orderId })}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Entregue
        </Button>
      )}
    </div>
  )
}
