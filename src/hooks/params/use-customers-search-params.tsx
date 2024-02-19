import { SetURLSearchParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

type CustomersQueryKey = [
  'customers',
  pageIndex?: number,
  perPage?: number,
  id?: string,
  name?: string,
  address?: string,
  email?: string,
  phone?: string,
]

export interface FormattedSearchParams {
  pageIndex?: number
  id?: string
  name?: string
  address?: string
  email?: string
  phone?: string
}
interface UseCustomersSearchParamsReturn {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  formattedSearchParams: FormattedSearchParams
  queryKey: CustomersQueryKey
}

export function useCustomersSearchParams(
  perPage: number,
): UseCustomersSearchParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id') || undefined
  const name = searchParams.get('name') || undefined
  const address = searchParams.get('address') || undefined
  const email = searchParams.get('email') || undefined
  const phone = searchParams.get('phone') || undefined
  const pageIndex =
    z.coerce
      .number()
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? '1') || undefined

  return {
    searchParams,
    setSearchParams,
    formattedSearchParams: {
      pageIndex,
      id,
      name,
      address,
      email,
      phone,
    },
    queryKey: [
      'customers',
      pageIndex,
      perPage,
      id,
      name,
      address,
      email,
      phone,
    ],
  }
}
