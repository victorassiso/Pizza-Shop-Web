import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye, MoreHorizontal, X } from 'lucide-react'
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
import { Dialog } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ChangeStatusButton } from '../common/status/change-status-button'
import { OrderStatus } from '../common/status/order-status'

export interface OrderCardProps {
  orderId: string
  createdAt: Date
  status: OrderStatusType
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
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-primary">{customerName}</CardTitle>
            <CardDescription className="mt-[6px]">{orderId}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute -top-11 right-9">
              <Button
                variant="ghost"
                className="flex w-full justify-start gap-2"
              >
                <Eye />
                <span>Ver detalhes</span>
              </Button>
              {/* <Button
                variant="ghost"
                className="flex w-full justify-start gap-2"
              >
                <ArrowRight />
                <span>Aprovar</span>
              </Button> */}
              <ChangeStatusButton orderId={orderId} status={status} />
              <Button
                variant="ghost"
                className="flex w-full justify-start gap-2 text-destructive"
              >
                <X />
                <span>Cancelar</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <strong>Status: </strong>
            <OrderStatus status={status} />
            {/* <OrderCardStatus status={status} /> */}
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
