import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/orders/get-orders'
import { Pagination } from '@/components/pagination'
import { CreateOrderFormProvider } from '@/contexts/create-order-form-context'
import { OrdersProvider } from '@/contexts/orders-context'

import { Header } from './components/common/orders-header'
import { OrdersTable } from './components/desktop/orders-table'
import { OrdersCardList } from './components/mobile/orders-card-list'

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

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <OrdersProvider>
      <Helmet title="Pedidos" />
      <CreateOrderFormProvider>
        <Header />
      </CreateOrderFormProvider>
      {/* Small Screen: Card View */}
      <div className="lg:hidden">
        <OrdersCardList
          orders={response?.orders}
          isLoadingOrders={isLoadingOrders}
        />
      </div>
      {/* Large Screen: Table View */}
      <div className="hidden lg:block">
        <OrdersTable
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
    </OrdersProvider>
  )
}
