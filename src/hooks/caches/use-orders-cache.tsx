import { useQueryClient } from '@tanstack/react-query'

import { OrderDTO } from '@/@types/api-dtos'
import { GetOrdersResponse } from '@/api/orders/get-orders'

export function useOrdersCache() {
  const queryClient = useQueryClient()

  function updateOrdersCache(order: OrderDTO) {
    const cached = queryClient.getQueryData<GetOrdersResponse>([
      'orders',
      0, // pageIndex
      null, // orderId
      null, // customerName
      null, // status
    ])
    if (!cached) {
      return
    }

    queryClient.setQueryData<GetOrdersResponse>(
      [
        'orders',
        0, // pageIndex
        null, // orderId
        null, // customerName
        null, // status
      ],
      {
        ...cached,
        orders: [
          {
            id: order.id,
            createdAt: order.createdAt,
            status: order.status,
            total: order.total,
            customerName: order.customerName,
          },
          ...cached.orders,
        ],
      },
    )
  }

  return updateOrdersCache
}
