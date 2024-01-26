import { api } from '@/lib/axios'

export enum OrderStatus {
  pending = 'pending',
  canceled = 'canceled',
  processing = 'processing',
  delivering = 'delivering',
  delivered = 'delivered',
}

export interface Order {
  workspaceId: string
  id: string
  customerId: string
  total: number
  status: OrderStatus
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

  console.log(response.data)
  const order = response.data.order

  return order
}
