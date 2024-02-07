import { Order } from '@/@types/bd-entities'
import { api } from '@/lib/axios'

export interface CreateOrderRequest {
  customerId: string
  items: {
    productId: string
    quantity: number
  }[]
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
