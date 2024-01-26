import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/orders/get-orders'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createOrderContext } from '@/contexts/create-order-context'

import { CreateOrderDialog } from './create-order/create-order-dialog'
import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  const { clearItems } = useContext(createOrderContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDialog, setOpenDialog] = useState(false)

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: response } = useQuery({
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

  function handleOpenDialog(open: boolean) {
    if (!open) {
      clearItems()
    }
    setOpenDialog(open)
  }
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
            <DialogTrigger asChild>
              <Button>Novo pedido</Button>
            </DialogTrigger>
            {/* <CreateOrderContextProvider> */}
            <CreateOrderDialog handleOpenDialog={handleOpenDialog} />
            {/* </CreateOrderContextProvider> */}
          </Dialog>
        </div>
        <div className="space-y-2.5">
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
      </div>
    </>
  )
}
