import { OrderStatusType } from '@/@types/order'
import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrdersResponseOrder {
  orderId: string
  createdAt: Date
  status: OrderStatusType
  customerName: string
  total: number
}

export interface GetOrdersResponseMetaData {
  pageIndex: number
  perPage: number
  totalCount: number
}
export interface GetOrdersResponse {
  orders: GetOrdersResponseOrder[]
  meta: GetOrdersResponseMetaData
}

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) {
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
