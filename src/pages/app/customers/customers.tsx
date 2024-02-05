import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getCustomers } from '@/api/customers/get-customers'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CustomerTableRow } from './components/customers/customer-table-row'
import { CustomerTableSkeleton } from './components/customers/customer-table-skeleton'
import { Filter } from './components/header/components/filter/filter'
import { CreateCustomerDialog } from './components/header/create-customer-dialog'

export function Customers() {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
  const address = searchParams.get('address')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: response, isLoading: isLoadingCustomers } = useQuery({
    queryKey: [
      'products',
      pageIndex,
      10, // perPage
      id,
      name,
      email,
      phone,
      address,
    ],
    queryFn: () =>
      getCustomers({
        pageIndex,
        perPage: 10,
        id,
        name,
        email,
        phone,
        address,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Helmet title="Clientes" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Novo cliente</Button>
            </DialogTrigger>
            <CreateCustomerDialog setOpenDialog={setOpenDialog} />
          </Dialog>
        </div>
        <Filter />
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/12">Identificador</TableHead>
                  <TableHead className="w-2/12">Nome</TableHead>
                  <TableHead className="w-3/12">Endereço</TableHead>
                  <TableHead className="w-2/12">E-mail</TableHead>
                  <TableHead className="w-2/12">Telefone</TableHead>
                  <TableHead className="w-1/12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingCustomers && <CustomerTableSkeleton />}
                {response &&
                  response.customers.map((customer) => {
                    return (
                      <CustomerTableRow
                        key={customer.id}
                        id={customer.id}
                        name={customer.name}
                        email={customer.email}
                        phone={customer.phone}
                        address={customer.address}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
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
