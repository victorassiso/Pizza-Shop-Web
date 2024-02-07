import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export function useOrdersSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  return {
    searchParams: {
      orderId,
      customerName,
      status,
      pageIndex,
    },
    setSearchParams,
  }
}
