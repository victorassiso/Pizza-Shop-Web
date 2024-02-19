import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getCustomers } from '@/api/customers/get-customers'
import { Pagination } from '@/components/pagination'
import { useCustomersSearchParams } from '@/hooks/params/use-customers-search-params'
import { useScreenSize } from '@/hooks/use-screen-size'

import { CustomersHeader } from './components/common/customers-header'
import { CustomersTable } from './components/desktop/customers-table'
import { CustomersCardList } from './components/mobile/customers-card-list'

export function Customers() {
  const { formattedSearchParams, queryKey, setSearchParams } =
    useCustomersSearchParams(10)
  const { screenWidth } = useScreenSize()

  const { data: response, isLoading: isLoadingCustomers } = useQuery({
    queryKey,
    queryFn: () =>
      getCustomers({
        ...formattedSearchParams,
        perPage: 10,
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
      <CustomersHeader />
      {screenWidth >= 768 ? (
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
