import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders, GetOrdersResponse } from '@/api/orders/get-orders'
import { Pagination } from '@/components/pagination'

import { OrderCardList } from './components/card-list/order-card-list'
import { OrdersHeader } from './components/header/orders-header'
import { OrderStatusType } from './components/order-status'
import { OrderTable } from './components/table/order-table'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: response, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
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
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <OrdersHeader />
      {/* Small Screen: Card View */}
      <div className="lg:hidden">
        <OrderCardList
          orders={response?.orders}
          isLoadingOrders={isLoadingOrders}
          updateOrderStatusOnCache={updateOrderStatusOnCache}
        />
      </div>
      {/* Large Screen: Table View */}
      <div className="hidden lg:block">
        <OrderTable
          orders={response?.orders}
          isLoadingOrders={isLoadingOrders}
        />
      </div>
      {response && (
        <Pagination
          pageIndex={response.meta.pageIndex}
          totalCount={response.meta.totalCount}
          perPage={response.meta.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </>
  )
}
