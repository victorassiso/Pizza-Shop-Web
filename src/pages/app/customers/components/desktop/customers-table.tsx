import { GetCustomersResponseData } from '@/api/customers/get-customers'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CustomerTableRow } from './customers-table-row'
import { CustomerTableSkeleton } from './customers-table-skeleton'

interface CustomerTableProps {
  response?: GetCustomersResponseData
  isLoadingCustomers: boolean
}

export function CustomersTable({
  isLoadingCustomers,
  response,
}: CustomerTableProps) {
  return (
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
  )
}
