import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getCustomers } from '@/api/customers/get-customers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CreateCustomerDialog } from './create-customer-dialog'
import { CustomerTableRow } from './customer-table-row'

export function Customers() {
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({}),
  })

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
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Nome</TableHead>
                  <TableHead className="w-[180px]">Endereço</TableHead>
                  <TableHead className="w-[140px]">E-mail</TableHead>
                  <TableHead className="w-[140px]">Telefone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers &&
                  customers.map((customer) => {
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
    </>
  )
}
