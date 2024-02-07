import { useMutation } from '@tanstack/react-query'
import { PlaneLanding, PlaneTakeoff, ThumbsUp } from 'lucide-react'
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
        toast.success('Status do pedido atualizado com sucesso!')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { id }) {
        updateOrderStatusOnCache(id, 'delivering')
        toast.success('Status do pedido atualizado com sucesso!')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { id }) {
        updateOrderStatusOnCache(id, 'delivered')
        toast.success('Status do pedido atualizado com sucesso!')
      },
    })

  return (
    <div>
      {status === 'pending' && (
        <Button
          variant="ghost"
          disabled={isApprovingOrder}
          onClick={() => approveOrderFn({ id })}
          className="flex w-full flex-row justify-start gap-2"
        >
          <ThumbsUp />
          Aprovar
        </Button>
      )}

      {status === 'processing' && (
        <Button
          variant="ghost"
          disabled={isDispatchingOrder}
          onClick={() => dispatchOrderFn({ id })}
          className="flex w-full flex-row justify-start gap-2"
        >
          <PlaneTakeoff />
          Em entrega
        </Button>
      )}

      {status === 'delivering' && (
        <Button
          variant="ghost"
          disabled={isDeliveringOrder}
          onClick={() => deliverOrderFn({ id })}
          className="flex w-full flex-row justify-start gap-2"
        >
          <PlaneLanding />
          Entregue
        </Button>
      )}
    </div>
  )
}
