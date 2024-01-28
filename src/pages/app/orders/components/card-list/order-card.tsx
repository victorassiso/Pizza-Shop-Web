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

import { OrderStatus } from '../order-status'

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{customerName}</CardTitle>
        <CardDescription>{orderId}</CardDescription>
        {/* <OrderCardStatus status={status} /> */}
      </CardHeader>
      <CardContent>
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
        <div className="text-muted-foreground">
          <span>Realizado há: </span>
          <span>
            {formatDistanceToNow(createdAt, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
