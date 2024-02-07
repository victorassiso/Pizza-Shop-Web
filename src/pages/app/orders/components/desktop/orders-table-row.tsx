import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { OrderStatus as OrderStatusType } from '@/@types/bd-entities'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from '../common/order-details'
import { OrderStatus } from '../common/order-status'
import { CancelOrderButton } from './cancel-order-button'
import { ChangeStatusButton } from './change-status-button'
export interface OrdersTableRowProps {
  id: string
  createdAt: Date
  status: OrderStatusType
  customerName: string
  total: number
}

export function OrdersTableRow({
  id,
  createdAt,
  status,
  customerName,
  total,
}: OrdersTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails id={id} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <ChangeStatusButton id={id} status={status} />
      </TableCell>
      <TableCell>
        <CancelOrderButton id={id} status={status} />
      </TableCell>
    </TableRow>
  )
}
