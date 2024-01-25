import { api } from '@/lib/axios'

export interface GetOrderDetailsQuery {
  orderId: string
}

export interface OrderDetails {
  id: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  total: number
  createdAt: Date
  customer: {
    name: string
    email: string
    phone: string
  }
  orderItems: {
    id: string
    price: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

interface GetOrderDetailsResponse {
  orderDetails: OrderDetails
}

export async function getOrderDetails({ orderId }: GetOrderDetailsQuery) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  const orderDetails = response.data.orderDetails

  return orderDetails
}
