import { SetURLSearchParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { GetProductsRequest } from '@/api/products/get-products'

interface UseProductsSearchParamsReturn {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  data: GetProductsRequest
}

export function useProductsSearchParams(): UseProductsSearchParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id') || undefined
  const name = searchParams.get('name') || undefined
  const category = searchParams.get('category') || undefined
  const description = searchParams.get('description') || undefined
  const minPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('minPrice'))
  const maxPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('maxPrice'))

  const pageIndex =
    z.coerce
      .number()
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? '1') || undefined

  return {
    searchParams,
    setSearchParams,
    data: {
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
      pageIndex,
    },
  }
}
