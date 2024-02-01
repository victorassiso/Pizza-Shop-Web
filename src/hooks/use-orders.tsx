import { useContext } from 'react'

import { OrdersContext } from '@/contexts/orders-context'

export function useOrders() {
  const ordersContext = useContext(OrdersContext)
  return ordersContext
}
