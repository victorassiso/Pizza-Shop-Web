import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { OrderStatusType } from '@/@types/order'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { OrderDetails } from '../common/order-details'
import { OrderStatus } from '../common/order-status'
import { CancelOrderButton } from './cancel-order-button'
import { ChangeStatusButton } from './change-status-button'

export interface OrdersCardProps {
  orderId: string
  createdAt: Date
  status: OrderStatusType
  customerName: string
  total: number
}

export function OrdersCard({
  orderId,
  createdAt,
  status,
  customerName,
  total,
}: OrdersCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-primary">{customerName}</CardTitle>
            <CardDescription className="mt-[6px]">{orderId}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute -top-11 right-9">
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-start gap-2"
                >
                  <Eye />
                  <span>Ver detalhes</span>
                </Button>
              </DialogTrigger>
              <OrderDetails orderId={orderId} open={isDetailsOpen} />
              <ChangeStatusButton orderId={orderId} status={status} />
              <CancelOrderButton orderId={orderId} status={status} />
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <strong>Status: </strong>
            <OrderStatus status={status} />
          </span>
          <span>
            <strong>Iniciado: </strong>
            {formatDistanceToNow(createdAt, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
          <span>
            <strong>Total: </strong>
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </CardContent>
      </Card>
    </Dialog>
  )
}
