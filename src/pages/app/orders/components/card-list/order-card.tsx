import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { CancelOrderButton } from '../cancel-order-button'
import { ChangeStatusButton } from '../change-status-button'
import { OrderDetails } from '../details-dialog/order-details'
import { OrderStatus, OrderStatusType } from '../order-status'

export interface OrderCardProps {
  orderId: string
  createdAt: Date
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
  updateOrderStatusOnCache: (orderId: string, status: OrderStatusType) => void
}

export function OrderCard({
  orderId,
  createdAt,
  status,
  customerName,
  total,
  updateOrderStatusOnCache,
}: OrderCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <Card style={{ position: 'relative' }}>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger asChild className="absolute right-2 top-2">
          <Button variant="ghost" size="xs" className="">
            <MoreHorizontal className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </DialogTrigger>
        <OrderDetails orderId={orderId} open={isDetailsOpen} />
      </Dialog>
      <CardHeader>
        <CardTitle>{customerName}</CardTitle>
        <CardDescription className="flex justify-between gap-2">
          <span className="">{orderId}</span>
          <span className="min-w-14 text-right">
            {formatDistanceToNow(createdAt, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </CardDescription>
        {/* <OrderCardStatus status={status} /> */}
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex gap-4">
          <OrderStatus status={status} />
        </div>
        <div className="text-muted-foreground">
          <span>Total: </span>
          <span>
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CancelOrderButton
          orderId={orderId}
          status={status}
          updateOrderStatusOnCache={updateOrderStatusOnCache}
        />
        <ChangeStatusButton
          orderId={orderId}
          status={status}
          updateOrderStatusOnCache={updateOrderStatusOnCache}
        />
      </CardFooter>
    </Card>
  )
}
