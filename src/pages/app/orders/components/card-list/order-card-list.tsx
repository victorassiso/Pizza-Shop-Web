import { GetOrdersResponseOrder } from '@/api/orders/get-orders'

import { OrderStatusType } from '../order-status'
import { OrderCard } from './order-card'
import { OrderCardListSkeleton } from './order-card-list-skeleton'

interface OrderCardListProps {
  orders?: GetOrdersResponseOrder[]
  isLoadingOrders: boolean
  updateOrderStatusOnCache: (orderId: string, status: OrderStatusType) => void
}

export function OrderCardList({
  orders,
  isLoadingOrders,
  updateOrderStatusOnCache,
}: OrderCardListProps) {
  return (
    <div className="flex flex-col gap-2">
      {isLoadingOrders && <OrderCardListSkeleton />}
      {orders &&
        orders.map((order) => {
          return (
            <OrderCard
              key={order.orderId}
              updateOrderStatusOnCache={updateOrderStatusOnCache}
              {...order}
            />
          )
        })}
    </div>
  )
}
