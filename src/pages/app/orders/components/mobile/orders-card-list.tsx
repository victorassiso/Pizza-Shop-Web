import { OrderDTO } from '@/@types/api-dtos'

import { OrdersCard } from './orders-card'
import { OrdersCardListSkeleton } from './orders-card-list-skeleton'

interface OrderCardListProps {
  orders?: OrderDTO[]
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
          return <OrdersCard key={order.id} {...order} />
        })}
    </div>
  )
}
