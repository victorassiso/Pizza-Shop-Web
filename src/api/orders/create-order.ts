import { OrderStatusType } from '@/@types/order'
import { api } from '@/lib/axios'

export interface Order {
  workspaceId: string
  id: string
  customerId: string
  total: number
  status: OrderStatusType
  createdAt: Date
  updatedAt: Date
}
export interface CreateOrderItem {
  productId: string
  quantity: number
}

export interface CreateOrderRequest {
  customerId: string
  items: CreateOrderItem[]
}

export interface CreateOrderResponse {
  order: Order
}

export async function createOrder({ customerId, items }: CreateOrderRequest) {
  const response = await api.post<CreateOrderResponse>('/orders', {
    customerId,
    items,
  })

  const order = response.data.order

  return order
}
