import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { OrderStatus } from '@/@types/bd-entities'
import { approveOrder } from '@/api/orders/approve-order'
import { deliverOrder } from '@/api/orders/deliver-order'
import { dispatchOrder } from '@/api/orders/dispatch-order'
import { Button } from '@/components/ui/button'
import { useOrders } from '@/hooks/use-orders'

interface ChangeStatusButtonProps {
  id: string
  status: OrderStatus
}
export function ChangeStatusButton({ id, status }: ChangeStatusButtonProps) {
  const { updateOrderStatusOnCache } = useOrders()

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { id }) {
        updateOrderStatusOnCache(id, 'processing')
        toast.success('Status do pedido atualizado com sucesso!', {
          closeButton: true,
        })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { id }) {
        updateOrderStatusOnCache(id, 'delivering')
        toast.success('Status do pedido atualizado com sucesso!', {
          closeButton: true,
        })
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { id }) {
        updateOrderStatusOnCache(id, 'delivered')
        toast.success('Status do pedido atualizado com sucesso!', {
          closeButton: true,
        })
      },
    })

  return (
    <div>
      {status === 'pending' && (
        <Button
          variant="outline"
          size="xs"
          disabled={isApprovingOrder}
          onClick={() => approveOrderFn({ id })}
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
          onClick={() => dispatchOrderFn({ id })}
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
          onClick={() => deliverOrderFn({ id })}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Entregue
        </Button>
      )}
    </div>
  )
}
