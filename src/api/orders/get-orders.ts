import { OrderDTO, PaginationMeta } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface GetOrdersRequest {
  pageIndex?: number
  orderId?: string
  customerName?: string
  status?: string
}

export interface GetOrdersResponse {
  orders: OrderDTO[]
  meta: PaginationMeta
}

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersRequest) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })

  return response.data
}
