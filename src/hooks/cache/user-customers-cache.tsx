import { QueryKey, useQueryClient } from '@tanstack/react-query'

import { CustomerDTO } from '@/@types/api-dtos'
import { GetCustomersResponse } from '@/api/customers/get-customers'

import { useCustomersSearchParams } from '../params/use-customers-search-params'

export function useCustomersCache() {
  const queryClient = useQueryClient()
  const { formattedSearchParams: params } = useCustomersSearchParams(10)

  function updateCache(queryKey: QueryKey, newCustomer: CustomerDTO) {
    const cached = queryClient.getQueryData<GetCustomersResponse>(queryKey)

    if (!cached) {
      return
    }

    queryClient.setQueryData<GetCustomersResponse>(queryKey, {
      ...cached,
      customers: [newCustomer, ...cached.customers],
    })
  }
  function getQueryKeys(newCustomer: CustomerDTO) {
    const doesNewCustomerNameMatchesCurrentFilter =
      !params.name || newCustomer.name.includes(params.name)

    const doesNewCustomerAddressMatchesCurrentFilter =
      !params.address || newCustomer.address.includes(params.address)

    const doesNewCustomerEmailMatchesCurrentFilter =
      !params.email || newCustomer.email.includes(params.email)

    const doesNewCustomerPhoneMatchesCurrentFilter =
      !params.phone || newCustomer.phone.includes(params.phone)

    const filteredQueryKey = [
      'customers',
      undefined, // pageIndex
      10, // perPage
      undefined, // id
      doesNewCustomerNameMatchesCurrentFilter ? params.name : undefined,
      doesNewCustomerAddressMatchesCurrentFilter ? params.address : undefined,
      doesNewCustomerEmailMatchesCurrentFilter ? params.email : undefined,
      doesNewCustomerPhoneMatchesCurrentFilter ? params.phone : undefined,
    ]

    const emptyFilterQueryKey = [
      'customers',
      undefined, // pageIndex
      10, // perPage
      undefined, // id
      undefined, // name
      undefined, // address
      undefined, // email
      undefined, // phone
    ]

    const shouldUpdateFilteredCache =
      (doesNewCustomerNameMatchesCurrentFilter ||
        doesNewCustomerAddressMatchesCurrentFilter ||
        doesNewCustomerEmailMatchesCurrentFilter ||
        doesNewCustomerPhoneMatchesCurrentFilter) &&
      JSON.stringify(filteredQueryKey) !== JSON.stringify(emptyFilterQueryKey)

    return { emptyFilterQueryKey, filteredQueryKey, shouldUpdateFilteredCache }
  }

  function handleUpdateCustomersCache(newCustomer: CustomerDTO) {
    const { emptyFilterQueryKey, filteredQueryKey, shouldUpdateFilteredCache } =
      getQueryKeys(newCustomer)

    updateCache(emptyFilterQueryKey, newCustomer)

    if (shouldUpdateFilteredCache) {
      updateCache(filteredQueryKey, newCustomer)
    }
  }

  return { handleUpdateCustomersCache }
}
