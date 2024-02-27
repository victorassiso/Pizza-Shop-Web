import { QueryKey, useQueryClient } from '@tanstack/react-query'

import { OrderDTO } from '@/@types/api-dtos'
import { Order } from '@/@types/bd-entities'
import { GetOrdersResponse } from '@/api/orders/get-orders'

import { useOrdersSearchParams } from '../params/use-orders-search-params'

export function useOrdersCache() {
  const queryClient = useQueryClient()
  const { formattedSearchParams: params } = useOrdersSearchParams()

  function updateCache(queryKey: QueryKey, newOrder: OrderDTO) {
    const cached = queryClient.getQueryData<GetOrdersResponse>(queryKey)

    if (!cached) {
      return
    }

    queryClient.setQueryData<GetOrdersResponse>(queryKey, {
      ...cached,
      orders: [newOrder, ...cached.orders],
    })
  }
  function getQueryKeys(newOrder: OrderDTO) {
    const doesNewOrderCustomerNameMatchesCurrentFilter =
      !params.customerName ||
      newOrder.customerName.includes(params.customerName)

    const doesNewOrderStatusMatchesCurrentFilter =
      !params.status ||
      params.status === 'all' ||
      newOrder.status === params.status

    const filteredQueryKey = [
      'orders',
      undefined, // pageIndex
      undefined, // id
      doesNewOrderCustomerNameMatchesCurrentFilter
        ? params.customerName
        : undefined,
      doesNewOrderStatusMatchesCurrentFilter ? params.status : undefined,
    ]

    const emptyFilterQueryKey = [
      'orders',
      undefined, // pageIndex
      undefined, // id
      undefined, // customerName
      undefined, // status
    ]

    const shouldUpdateFilteredCache =
      (doesNewOrderCustomerNameMatchesCurrentFilter ||
        doesNewOrderStatusMatchesCurrentFilter) &&
      JSON.stringify(filteredQueryKey) !== JSON.stringify(emptyFilterQueryKey)

    return { emptyFilterQueryKey, filteredQueryKey, shouldUpdateFilteredCache }
  }

  function handleUpdateOrdersCache(_newOrder: Order, customerName: string) {
    const newOrder: OrderDTO = {
      id: _newOrder.id,
      customerName,
      status: _newOrder.status,
      total: _newOrder.total,
      createdAt: _newOrder.createdAt,
    }
    const { emptyFilterQueryKey, filteredQueryKey, shouldUpdateFilteredCache } =
      getQueryKeys(newOrder)

    updateCache(emptyFilterQueryKey, newOrder)

    if (shouldUpdateFilteredCache) {
      updateCache(filteredQueryKey, newOrder)
    }
  }

  return { handleUpdateOrdersCache }
}
