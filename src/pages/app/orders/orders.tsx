import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/orders/get-orders'
import { Pagination } from '@/components/pagination'

import { OrderCardList } from './components/card-list/order-card-list'
import { OrderCardListSkeleton } from './components/card-list/order-card-list-skeleton'
import { OrdersHeader } from './components/header/orders-header'
import { OrderTable } from './components/table/order-table'
import { OrderTableSkeleton } from './components/table/order-table-skeleton'

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
    <>
      <Helmet title="Pedidos" />
      <OrdersHeader />
      {/* Small Screen: Card View */}
      <div className="lg:hidden">
        <OrderCardList />
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

      {/* <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
            <DialogTrigger asChild>
              <Button>Novo pedido</Button>
            </DialogTrigger>
            <FormProvider {...createOrderForm}>
              <CreateOrderDialog handleOpenDialog={handleOpenDialog} />
            </FormProvider>
          </Dialog>
        </div>
        <div className="hidden space-y-2.5 lg:block">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[180px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingOrders && <OrderTableSkeleton />}
                {response &&
                  response.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} {...order} />
                  })}
              </TableBody>
            </Table>
          </div>
          {response && (
            <Pagination
              pageIndex={response.meta.pageIndex}
              totalCount={response.meta.totalCount}
              perPage={response.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
        <div className="lg:hidden">
          {response &&
            response.orders.map((order) => {
              return <OrderCard key={order.orderId} {...order} />
            })}
        </div>
      </div> */}
    </>
  )
}
