import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { getOrders } from '@/api/orders/get-orders'

export function useOrdersQuery(searchParams: URLSearchParams) {
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const useOrdersQuery = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId: orderId || undefined,
        customerName: customerName || undefined,
        status: status ? (status === 'all' ? undefined : status) : undefined,
      }),
  })

  return useOrdersQuery
}
