import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getOrders } from '@/api/orders/get-orders'
import { Pagination } from '@/components/pagination'
import { CreateOrderFormProvider } from '@/contexts/create-order-form-context'
import { OrdersProvider } from '@/contexts/orders-context'
import { useOrdersSearchParams } from '@/hooks/params/use-orders-search-params'
import { useScreenSize } from '@/hooks/use-screen-size'

import { Header } from './components/common/orders-header'
import { OrdersTable } from './components/desktop/orders-table'
import { OrdersCardList } from './components/mobile/orders-card-list'

export function Orders() {
  const { formattedSearchParams, queryKey, setSearchParams } =
    useOrdersSearchParams()
  const { screenWidth } = useScreenSize()

  const { data: response, isLoading: isLoadingOrders } = useQuery({
    queryKey,
    queryFn: () =>
      getOrders({
        ...formattedSearchParams,
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
      {screenWidth >= 768 ? (
        <OrdersTable
          orders={response?.orders}
          isLoadingOrders={isLoadingOrders}
        />
      ) : (
        <OrdersCardList
          orders={response?.orders}
          isLoadingOrders={isLoadingOrders}
        />
      )}
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
