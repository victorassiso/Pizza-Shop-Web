import { SetURLSearchParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

type ProductsQueryKey = [
  'products',
  pageIndex?: number,
  perPage?: number,
  id?: string,
  name?: string,
  category?: string,
  description?: string,
  minPrice?: number,
  maxPrice?: number,
]

export interface FormattedSearchParams {
  pageIndex?: number
  id?: string
  name?: string
  description?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}
interface UseProductsSearchParamsReturn {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  formattedSearchParams: FormattedSearchParams
  queryKey: ProductsQueryKey
}

export function useProductsSearchParams(
  perPage: number,
): UseProductsSearchParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id') || undefined
  const name = searchParams.get('name') || undefined
  const category = searchParams.get('category') || undefined
  const description = searchParams.get('description') || undefined
  const minPrice =
    z.coerce
      .number()
      .transform((value) => value || undefined)
      .parse(searchParams.get('minPrice')) || undefined
  const maxPrice =
    z.coerce
      .number()
      .transform((value) => value || undefined)
      .parse(searchParams.get('maxPrice')) || undefined

  const pageIndex =
    z.coerce
      .number()
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? '1') || undefined

  return {
    searchParams,
    setSearchParams,
    formattedSearchParams: {
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
      pageIndex,
    },
    queryKey: [
      'products',
      pageIndex,
      perPage,
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
    ],
  }
}
