import { useQueryClient } from '@tanstack/react-query'
import { createContext, ReactNode } from 'react'

import { OrderStatus } from '@/@types/bd-entities'
import { GetOrdersResponse } from '@/api/orders/get-orders'

interface OrdersContextProps {
  updateOrderStatusOnCache: (orderId: string, status: OrderStatus) => void
}

export const OrdersContext = createContext({} as OrdersContextProps)

interface OrdersProviderProps {
  children: ReactNode
}

export function OrdersProvider({ children }: OrdersProviderProps) {
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        /* empty */
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  return (
    <OrdersContext.Provider
      value={{
        updateOrderStatusOnCache,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
