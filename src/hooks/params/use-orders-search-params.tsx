import { SetURLSearchParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { GetOrdersRequest } from '@/api/orders/get-orders'

type OrdersQueryKey = [
  'orders',
  pageIndex?: number,
  orderId?: string,
  customerName?: string,
  status?: string,
]

interface UseOrdersSearchParamsReturn {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  formatedSearchParams: GetOrdersRequest
  queryKey: OrdersQueryKey
}

export function useOrdersSearchParams(): UseOrdersSearchParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId') || undefined
  const customerName = searchParams.get('customerName') || undefined
  const status =
    searchParams.get('status') === 'all'
      ? undefined
      : searchParams.get('status') || undefined
  const pageIndex =
    z.coerce
      .number()
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? '1') || undefined

  return {
    searchParams,
    setSearchParams,
    formatedSearchParams: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
    queryKey: ['orders', pageIndex, orderId, customerName, status],
  }
}
