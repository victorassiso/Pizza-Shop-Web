import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CancelOrderButton } from '../cancel-order-button'
import { ChangeStatusButton } from '../change-status-button'
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{customerName}</CardTitle>
        <CardDescription className="flex justify-between">
          {orderId}
          <span className="text-right">
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
