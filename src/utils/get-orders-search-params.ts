import { z } from 'zod'

export function getOrdersSearchParams(searchParams: URLSearchParams) {
  const orderId = searchParams.get('orderId') || undefined
  const customerName = searchParams.get('customerName') || undefined
  const status = searchParams.get('status') || undefined
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  return {
    pageIndex,
    orderId,
    customerName,
    status,
  }
}
