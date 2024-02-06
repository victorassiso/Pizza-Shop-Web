import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getCustomers } from '@/api/customers/get-customers'
import { Pagination } from '@/components/pagination'
import { useScreenSize } from '@/hooks/use-screen-size'

import { CustomersHeader } from './components/common/customers-header'
import { CustomersTable } from './components/desktop/customers-table'
import { CustomersCardList } from './components/mobile/customers-card-list'

export function Customers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { screenWidth } = useScreenSize()

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

  return (
    <>
      <Helmet title="Clientes" />
      <div className="flex flex-col gap-4">
        <CustomersHeader />
        {screenWidth >= 1024 ? (
          <CustomersTable
            isLoadingCustomers={isLoadingCustomers}
            response={response}
          />
        ) : (
          <CustomersCardList
            isLoadingCustomers={isLoadingCustomers}
            response={response}
          />
        )}
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
