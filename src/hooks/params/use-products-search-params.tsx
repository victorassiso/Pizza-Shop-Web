import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export function useProductsSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const category = searchParams.get('category')
  const description = searchParams.get('description')
  const minPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('minPrice'))
  const maxPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('maxPrice'))

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  return {
    searchParams: {
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
      pageIndex,
    },
    setSearchParams,
  }
}
