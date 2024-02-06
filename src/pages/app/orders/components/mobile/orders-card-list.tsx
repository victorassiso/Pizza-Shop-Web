import { GetOrdersResponseOrder } from '@/api/orders/get-orders'

import { OrdersCard } from './orders-card'
import { OrdersCardListSkeleton } from './orders-card-list-skeleton'

interface OrderCardListProps {
  orders?: GetOrdersResponseOrder[]
  isLoadingOrders: boolean
}

export function OrdersCardList({
  orders,
  isLoadingOrders,
}: OrderCardListProps) {
  return (
    <div className="flex flex-col gap-2">
      {isLoadingOrders && <OrdersCardListSkeleton />}
      {orders &&
        orders.map((order) => {
          return <OrdersCard key={order.orderId} {...order} />
        })}
    </div>
  )
}
