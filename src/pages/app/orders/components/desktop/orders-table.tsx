import { GetOrdersResponseOrder } from '@/api/orders/get-orders'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrdersTableRow } from './orders-table-row'
import { OrdersTableSkeleton } from './orders-table-skeleton'

interface OrderTableProps {
  orders?: GetOrdersResponseOrder[]
  isLoadingOrders: boolean
}

export function OrdersTable({ orders, isLoadingOrders }: OrderTableProps) {
  return (
    <div className="w-full rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]"></TableHead>
            <TableHead className="w-[180px]">Identificador</TableHead>
            <TableHead className="w-[180px]">Realizado há</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="w-[140px]">Total do pedido</TableHead>
            <TableHead className="w-[164px]"></TableHead>
            <TableHead className="w-[132px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoadingOrders && <OrdersTableSkeleton />}
          {orders &&
            orders.map((order) => {
              return <OrdersTableRow key={order.orderId} {...order} />
            })}
        </TableBody>
      </Table>
    </div>
  )
}
