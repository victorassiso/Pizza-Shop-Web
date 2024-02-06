import { GetCustomersResponseData } from '@/api/customers/get-customers'

import { CustomersCard } from './customers-card'
import { CustomersCardListSkeleton } from './customers-card-list-skeleton'

interface CustomerCardListProps {
  response?: GetCustomersResponseData
  isLoadingCustomers: boolean
}

export function CustomersCardList({
  isLoadingCustomers,
  response,
}: CustomerCardListProps) {
  return (
    <>
      {isLoadingCustomers && <CustomersCardListSkeleton />}
      {response &&
        response.customers.map((customer) => {
          return (
            <CustomersCard
              key={customer.id}
              id={customer.id}
              name={customer.name}
              address={customer.address}
              phone={customer.phone}
              email={customer.email}
            />
          )
        })}
    </>
  )
}
