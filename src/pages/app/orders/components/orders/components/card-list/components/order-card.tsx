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

import { OrderDetails } from '../../details-dialog/order-details'
import { CancelOrderButton } from '../../status/cancel-order-button'
import { ChangeStatusButton } from '../../status/change-status-button'
import { OrderStatus } from '../../status/order-status'

export interface OrderCardProps {
  orderId: string
  createdAt: Date
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
}

export function OrderCard({
  orderId,
  createdAt,
  status,
  customerName,
  total,
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
        <CancelOrderButton orderId={orderId} status={status} />
        <ChangeStatusButton orderId={orderId} status={status} />
      </CardFooter>
    </Card>
  )
}
