import { GetOrdersResponseOrder } from '@/api/orders/get-orders'

import { OrderCard } from './components/order-card'
import { OrderCardListSkeleton } from './order-card-list-skeleton'

interface OrderCardListProps {
  orders?: GetOrdersResponseOrder[]
  isLoadingOrders: boolean
}

export function OrderCardList({ orders, isLoadingOrders }: OrderCardListProps) {
  return (
    <div className="flex flex-col gap-2">
      {isLoadingOrders && <OrderCardListSkeleton />}
      {orders &&
        orders.map((order) => {
          return <OrderCard key={order.orderId} {...order} />
        })}
    </div>
  )
}
